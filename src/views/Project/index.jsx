import { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ReactMarkdown from 'react-markdown';
import { ApolloConsumer } from 'react-apollo';
import _ from 'lodash';
import gql from 'graphql-tag';
import projects from '../../data/loader';
import BugsTable from '../../components/BugsTable';
import Issues from './issues.graphql';

class Project extends Component {
  constructor(props) {
    super(props);
    const fileName = props.match.params.projectKey;
    const projectInfo = projects[fileName];
    // dictionary with repo as key and tag as value
    const tmp = projectInfo.repositories
      ? projectInfo.repositories.reduce(
          (prev, cur) => ({ ...prev, ...cur }),
          {}
        )
      : {};
    // initial query search for all repo
    const repoQuerySearch = ['state:open'];
    // a dictionary of tag (string) and list of repository in that tag
    const tagRepoDictionary = Object.keys(tmp).reduce((prev, key) => {
      const curr = [
        ...(prev[tmp[key]] || [...repoQuerySearch, `label:${tmp[key]}`]),
        `repo:${key}`,
      ];

      return {
        ...prev,
        [tmp[key]]: curr,
      };
    }, {});
    const tagRepoList = Object.entries(tagRepoDictionary).map(
      ([key, value]) => ({
        label: key,
        query: value.join(' '),
      })
    );

    this.state = {
      projectInfo,
      tagRepoList,
      error: false,
      loading: true,
      data: [],
    };
  }
  componentDidMount() {
    const { tagRepoList } = this.state;

    this.fetchGithubDataNext(tagRepoList);
  }

  fetchGithubDataNext(tagRepoList) {
    const { client } = this.props;
    let allQuery = '';

    if (tagRepoList.length === 0) return;

    tagRepoList.forEach((tag, idx) => {
      const noCursorQuery = `_${idx}: search(first:100, type:ISSUE, query:"${
        tag.query
      }")\n
      {
      ...Issues
      }\n`;

      allQuery = allQuery.concat(noCursorQuery);
    });

    client
      .query({ query: gql`{${allQuery}}\n${Issues}` })
      .catch(
        () =>
          new Promise(resolve => {
            resolve(false);
          })
      )
      .then(({ data, error, loading }) => {
        const repositoriesData = Object.entries(data).map(([key, value]) => ({
          ...value,
          ...tagRepoList[parseInt(key.split('_')[1], 10)],
        }));
        // issueData is formatted like data in the state
        const issuesData = repositoriesData.reduce(
          (previous, repoData) => [
            ...previous,
            ...repoData.nodes.map(issue => {
              const obj = {
                project: issue.repository.name,
                id: issue.number,
                description: `${issue.number} - ${issue.title}`,
                tag: issue.labels.nodes.map(node => node.name).join(','),
                lastupdate: issue.updatedAt,
                assignedto: issue.assignees.nodes[0]
                  ? issue.assignees.nodes[0].login
                  : 'None',
              };

              return obj;
            }),
          ],
          []
        );

        this.setState({
          data: _.uniqBy(
            [...this.state.data, ...issuesData],
            'description'
          ).sort((a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)),
          error,
          loading,
        });
      });
  }
  render() {
    const { projectInfo, loading, error, data } = this.state;

    return (
      <div>
        <header>
          <Grid
            container
            spacing={16}
            direction="column"
            justify="center"
            alignItems="center">
            <Grid item xs={12}>
              <div>
                <div />
                <div>
                  <Typography variant="display4" align="center">
                    {projectInfo.name}
                  </Typography>
                  {projectInfo.description && (
                    <Typography align="center">
                      <ReactMarkdown source={projectInfo.description} />
                    </Typography>
                  )}
                </div>
                <div />
              </div>
            </Grid>
          </Grid>
          <BugsTable
            projectName={projectInfo.name}
            error={error}
            loading={loading}
            data={data}
          />
        </header>
      </div>
    );
  }
}

const ProjectClient = props => (
  <ApolloConsumer>
    {client => <Project client={client} match={props.match} />}
  </ApolloConsumer>
);

export default ProjectClient;

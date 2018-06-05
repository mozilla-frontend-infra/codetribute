import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
import ErrorPanel from '../../components/ErrorPanel';
import TasksTable from '../../components/TasksTable';
import Issues from './issues.graphql';

const githubQuery = fileName => {
  const projectInfo = projects[fileName];
  // dictionary with repo as key and tag as value
  const tmp = projectInfo.repositories
    ? projectInfo.repositories.reduce((prev, cur) => ({ ...prev, ...cur }), {})
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
  const tagRepoList = Object.entries(tagRepoDictionary).map(([key, value]) => ({
    label: key,
    query: value.join(' '),
  }));

  if (tagRepoList.length === 0) return;

  let allQuery = '';

  tagRepoList.forEach((tag, idx) => {
    const noCursorQuery = `_${idx}: search(first:100, type:ISSUE, query:"${
      tag.query
    }")\n
      {
      ...Issues
      }\n`;

    allQuery = allQuery.concat(noCursorQuery);
  });

  return allQuery;
};

class Project extends Component {
  state = {
    error: false,
    loading: false,
    data: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.githubData) return;

    const issuesData = Object.values(nextProps.githubData.data).reduce(
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

    return {
      data: _.uniqBy([...prevState.data, ...issuesData], 'description').sort(
        (a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)
      ),
      error: nextProps.githubData.error,
      loading: nextProps.githubData.loading,
    };
  }

  render() {
    const project = projects[this.props.match.params.project];
    const { loading, error, data } = this.state;

    return (
      <Fragment>
        <header>
          <Typography variant="display2" align="center">
            {project.name}
          </Typography>
          <Typography variant="subheading" align="center">
            Bugs & Issues
          </Typography>
        </header>
        {error && <ErrorPanel error={error} />}
        {loading && <Spinner />}
        {!error && !loading && <TasksTable items={data} />}
      </Fragment>
    );
  }
}

const ProjectClient = props => (
  <Query
    query={gql`{${githubQuery(props.match.params.projectKey)}}\n${Issues}`}
    skip={projects[props.match.params.projectKey].repositories === undefined}>
    {githubData => <Project match={props.match} githubData={githubData} />}
  </Query>
);

export default ProjectClient;

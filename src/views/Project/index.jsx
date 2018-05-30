import { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Typography from 'material-ui/Typography';
import ReactMarkdown from 'react-markdown';
import projects from '../../data/loader';
import BugsTable from '../../components/BugsTable';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: props.match.params.projectKey,
      projects,
    };
  }
  render() {
    const { fileName, projects } = this.state;
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
          <ApolloConsumer>
            {client => (
              <BugsTable
                client={client}
                projectName={projectInfo.name}
                tagRepoList={tagRepoList}
              />
            )}
          </ApolloConsumer>
        </header>
      </div>
    );
  }
}

export default Project;

import { Component } from 'react';
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
          <BugsTable />
        </header>
      </div>
    );
  }
}

export default Project;

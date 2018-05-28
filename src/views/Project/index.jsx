import { Component } from 'react';
import Typography from 'material-ui/Typography';
import projects from '../../data/loader';
import BugsTable from '../../components/BugsTable';

export default class Project extends Component {
  state = {
    fileName: this.props.match.params.projectKey,
    projects,
  };
  render() {
    const { fileName, projects } = this.state;
    const projectInfo = projects[fileName];

    return (
      <div>
        <header>
          <Typography variant="display1" align="center">
            {projectInfo.name}
          </Typography>
          <Typography align="center">Bugs & Issues</Typography>
          <BugsTable />
        </header>
      </div>
    );
  }
}

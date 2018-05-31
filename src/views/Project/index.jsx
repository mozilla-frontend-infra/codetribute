import { Component, Fragment } from 'react';
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
      <Fragment>
        <header>
          <Typography variant="display2" align="center">
            {projectInfo.name}
          </Typography>
          <Typography variant="subheading" align="center">
            Bugs & Issues
          </Typography>
        </header>
        <BugsTable />
      </Fragment>
    );
  }
}

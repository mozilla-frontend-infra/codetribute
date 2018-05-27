import { Component } from 'react';
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
          <Typography variant="display1" align="center">
            {projectInfo.name}
          </Typography>
          {projectInfo.description && (
            <Typography align="center">
              <ReactMarkdown source={projectInfo.description} />
            </Typography>
          )}
          <BugsTable />
        </header>
      </div>
    );
  }
}

export default Project;

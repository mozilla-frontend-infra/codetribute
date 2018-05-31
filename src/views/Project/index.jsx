import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from 'material-ui/Grid';
import { ApolloConsumer } from 'react-apollo';
import _ from 'lodash';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import projects from '../../data/loader';
import TasksTable from '../../components/TasksTable';
import Issues from './issues.graphql';

class Project extends Component {
  render() {
    const project = projects[this.props.match.params.project];

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
        <TasksTable items={data} />
      </Fragment>
    );
  }
}

const ProjectClient = props => (
  <ApolloConsumer>
    {client => <Project client={client} match={props.match} />}
  </ApolloConsumer>
);

export default ProjectClient;

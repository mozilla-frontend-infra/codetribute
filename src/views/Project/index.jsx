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

const data = [
  {
    project: 'Servo',
    summary: '1436212 - Add pagination to listClients',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-20',
  },
  {
    project: 'Taskcluster',
    summary:
      '1443017 - Use a mock AWS library to test publishing API definitions',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-14',
  },
  {
    project: 'Servo',
    summary: '1443016 - Create a fake version of azure-blob-storage',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-12',
  },
  {
    project: 'Servo',
    summary: '1441960 - Add measure of time to start processing a task',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-06',
  },
  {
    project: 'Taskcluster',
    summary: '1451548 - Return 404 for indexes and namespaces that are expired',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-04',
  },
  {
    project: 'Taskcluster',
    summary: '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-03',
  },
  {
    project: 'Servo',
    summary: '1446768 - Only post "No taskcluster jobs.." to a PR once',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-01',
  },
  {
    project: 'Taskcluster',
    summary:
      '1457126 - Authorization failures should state which clientId lacks scopes',
    tag: 'Rust',
    assignee: 'None',
    lastUpdated: '2018-04-05',
  },
  {
    project: 'Taskcluster',
    summary: '44 - Add pagination to auth.listRoles',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-03-05',
  },
  {
    project: 'Taskcluster',
    summary:
      '1306494 - Add a diff+commit submit button to some text areas in tc-tools',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-02-12',
  },
  {
    project: 'Taskcluster',
    summary:
      '333 - Make azure-entities and azure-blob0-storage independent of tc-lib-monitor',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-02-04',
  },
  {
    project: 'Taskcluster',
    summary: '1344912 - Support tag events, too',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-01-01',
  },
  {
    project: 'Taskcluster',
    summary: '1453714 - Return http 424 instead of 403 for error artifacts',
    tag: 'Python',
    assignee: 'None',
    lastUpdated: '2017-12-04',
  },
];

@hot(module)
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

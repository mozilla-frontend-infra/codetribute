import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import projects from '../../data/loader';
import TasksTable from '../../components/TasksTable';

const data = [
  {
    project: 'Servo',
    summary: '1436212 - Add pagination to listClients',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-20T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary:
      '1443017 - Use a mock AWS library to test publishing API definitions',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-14T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Servo',
    summary: '1443016 - Create a fake version of azure-blob-storage',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-12T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Servo',
    summary: '1441960 - Add measure of time to start processing a task',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-06T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary: '1451548 - Return 404 for indexes and namespaces that are expired',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-04T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary: '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-03T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Servo',
    summary: '1446768 - Only post "No taskcluster jobs.." to a PR once',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-05-01T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary:
      '1457126 - Authorization failures should state which clientId lacks scopes',
    tag: 'Rust',
    assignee: 'None',
    lastUpdated: '2018-04-05T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary: '44 - Add pagination to auth.listRoles',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-03-05T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary:
      '1306494 - Add a diff+commit submit button to some text areas in tc-tools',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-02-12T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary:
      '333 - Make azure-entities and azure-blob0-storage independent of tc-lib-monitor',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-02-04T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary: '1344912 - Support tag events, too',
    tag: 'JS',
    assignee: 'None',
    lastUpdated: '2018-01-01T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
  {
    project: 'Taskcluster',
    summary: '1453714 - Return http 424 instead of 403 for error artifacts',
    tag: 'Python',
    assignee: 'None',
    lastUpdated: '2017-12-04T21:58:21Z',
    url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1436212',
  },
];

@hot(module)
export default class Project extends Component {
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

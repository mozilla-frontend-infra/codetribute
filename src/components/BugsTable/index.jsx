import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const columns = ['Project', 'Summary', 'Tag', 'Assignee', 'Last Updated'];
const styles = theme => ({
  table: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    overflowX: 'auto',
  },
  summary: {
    whiteSpace: 'nowrap',
  },
});

class BugsTable extends Component {
  state = {
    order: 'desc',
    orderBy: 'Last Updated',
    data: [
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
        summary:
          '1451548 - Return 404 for indexes and namespaces that are expired',
        tag: 'JS',
        assignee: 'None',
        lastUpdated: '2018-05-04',
      },
      {
        project: 'Taskcluster',
        summary:
          '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
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
    ],
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy } = this.state;

    return (
      <Table className={classes.table} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column}
                sortDirection={orderBy === column ? order : false}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={order}
                  onClick={this.createSortHandler(column)}>
                  {column}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow
              hover
              tabIndex={-1}
              key={`${item.project}-${item.summary}`}>
              <TableCell component="th" scope="row">
                {item.project}
              </TableCell>
              <TableCell className={classes.summary}>{item.summary}</TableCell>
              <TableCell>{item.tag}</TableCell>
              <TableCell>{item.assignee}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(BugsTable);

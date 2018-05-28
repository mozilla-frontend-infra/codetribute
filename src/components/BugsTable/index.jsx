import { Component } from 'react';
import { object } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TableCell,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { PROJECTS_PAGE_SIZE } from '../../utils/constants';

const columns = [
  { numeric: false, label: 'Project' },
  {
    numeric: false,
    label: 'Summary',
  },
  { numeric: false, label: 'Tag' },
  {
    numeric: false,
    label: 'Assignee',
  },
  {
    numeric: false,
    label: 'Last Updated',
  },
];
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  description: {
    whiteSpace: 'nowrap',
  },
});

class BugsTable extends Component {
  static propTypes = {
    classes: object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'Last Updated',
      data: [
        {
          project: 'Servo',
          description: '1436212 - Add pagination to listClients',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-20',
        },
        {
          project: 'Taskcluster',
          description:
            '1443017 - Use a mock AWS library to test publishing API definitions',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-14',
        },
        {
          project: 'Servo',
          description: '1443016 - Create a fake version of azure-blob-storage',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-12',
        },
        {
          project: 'Servo',
          description:
            '1441960 - Add measure of time to start processing a task',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-06',
        },
        {
          project: 'Taskcluster',
          description:
            '1451548 - Return 404 for indexes and namespaces that are expired',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-04',
        },
        {
          project: 'Taskcluster',
          description:
            '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-03',
        },
        {
          project: 'Servo',
          description:
            '1446768 - Only post "No taskcluster jobs.." to a PR once',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-05-01',
        },
        {
          project: 'Taskcluster',
          description:
            '1457126 - Authorization failures should state which clientId lacks scopes',
          tag: 'Rust',
          assignedTo: 'None',
          lastUpdated: '2018-04-05',
        },
        {
          project: 'Taskcluster',
          description: '44 - Add pagination to auth.listRoles',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-03-05',
        },
        {
          project: 'Taskcluster',
          description:
            '1306494 - Add a diff+commit submit button to some text areas in tc-tools',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-02-12',
        },
        {
          project: 'Taskcluster',
          description:
            '333 - Make azure-entities and azure-blob0-storage independent of tc-lib-monitor',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-02-04',
        },
        {
          project: 'Taskcluster',
          description: '1344912 - Support tag events, too',
          tag: 'JS',
          assignedTo: 'None',
          lastUpdated: '2018-01-01',
        },
        {
          project: 'Taskcluster',
          description:
            '1453714 - Return http 424 instead of 403 for error artifacts',
          tag: 'Python',
          assignedTo: 'None',
          lastUpdated: '2017-12-04',
        },
      ].sort((a, b) => (a.lastUpdated > b.lastUpdated ? -1 : 1)),
      page: 0,
      rowsPerPage: PROJECTS_PAGE_SIZE,
    };
  }

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

  handlePageChange = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;

    return (
      <div className={classes.root}>
        <Toolbar>
          <Typography variant="title" id="tableTitle">
            Bugs and Issue
          </Typography>
          <div className={classes.spacer} />
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.label}
                    numeric={column.numeric}
                    sortDirection={orderBy === column.label ? order : false}>
                    <TableSortLabel
                      active={orderBy === column.label}
                      direction={order}
                      onClick={this.createSortHandler(column.label)}>
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={`${n.project}-${n.description}`}>
                    <TableCell component="th" scope="row">
                      {n.project}
                    </TableCell>
                    <TableCell className={classes.description}>
                      {n.description}
                    </TableCell>
                    <TableCell>{n.tag}</TableCell>
                    <TableCell>{n.assignedTo}</TableCell>
                    <TableCell>{n.lastUpdated}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={PROJECTS_PAGE_SIZE}
          rowsPerPageOptions={[PROJECTS_PAGE_SIZE]}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handlePageChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(BugsTable);

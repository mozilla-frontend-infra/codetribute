import { Component } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import BugsTableHead from './BugsTableHead';
import { PROJECTS_PAGE_SIZE } from '../../utils/constants';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});
let BugsTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
          Bugs and Issue
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

BugsTableToolbar.propTypes = {
  classes: object.isRequired,
};

BugsTableToolbar = withStyles(toolbarStyles)(BugsTableToolbar);

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
      orderBy: 'lastupdate',
      data: [
        {
          project: 'Servo',
          description: '1436212 - Add pagination to listClients',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-20',
        },
        {
          project: 'Taskcluster',
          description:
            '1443017 - Use a mock AWS library to test publishing API definitions',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-14',
        },
        {
          project: 'Servo',
          description: '1443016 - Create a fake version of azure-blob-storage',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-12',
        },
        {
          project: 'Servo',
          description:
            '1441960 - Add measure of time to start processing a task',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-06',
        },
        {
          project: 'Taskcluster',
          description:
            '1451548 - Return 404 for indexes and namespaces that are expired',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-04',
        },
        {
          project: 'Taskcluster',
          description:
            '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-03',
        },
        {
          project: 'Servo',
          description:
            '1446768 - Only post "No taskcluster jobs.." to a PR once',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-05-01',
        },
        {
          project: 'Taskcluster',
          description:
            '1457126 - Authorization failures should state which clientId lacks scopes',
          tag: 'Rust',
          assignedto: 'None',
          lastupdate: '2018-04-05',
        },
        {
          project: 'Taskcluster',
          description: '44 - Add pagination to auth.listRoles',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-03-05',
        },
        {
          project: 'Taskcluster',
          description:
            '1306494 - Add a diff+commit submit button to some text areas in tc-tools',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-02-12',
        },
        {
          project: 'Taskcluster',
          description:
            '333 - Make azure-entities and azure-blob0-storage independent of tc-lib-monitor',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-02-04',
        },
        {
          project: 'Taskcluster',
          description: '1344912 - Support tag events, too',
          tag: 'JS',
          assignedto: 'None',
          lastupdate: '2018-01-01',
        },
        {
          project: 'Taskcluster',
          description:
            '1453714 - Return http 424 instead of 403 for error artifacts',
          tag: 'Python',
          assignedto: 'None',
          lastupdate: '2017-12-04',
        },
      ].sort((a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)),
      page: 0,
      rowsPerPage: PROJECTS_PAGE_SIZE,
    };
  }

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
      <Paper className={classes.root}>
        <BugsTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <BugsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
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
                    <TableCell>{n.assignedto}</TableCell>
                    <TableCell>{n.lastupdate}</TableCell>
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
      </Paper>
    );
  }
}

export default withStyles(styles)(BugsTable);

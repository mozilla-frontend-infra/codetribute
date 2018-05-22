import { Component } from 'react';
import PropTypes from 'prop-types';
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

let counter = 0;

function createData(project, description, tag, assignedto, lastupdate) {
  counter += 1;

  return { id: counter, project, description, tag, assignedto, lastupdate };
}

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
          Bugs
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
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

BugsTableToolbar = withStyles(toolbarStyles)(BugsTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class BugsTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'lastupdate',
      selected: [],
      data: [
        createData(
          'Taskcluster',
          '333 - Make azure-entities and azure-blob0-storage independent of tc-lib-monitor',
          'JS',
          'None',
          '2018-02-04'
        ),
        createData(
          'Taskcluster',
          '44 - Add pagination to auth.listRoles',
          'JS',
          'None',
          '2018-03-05'
        ),
        createData(
          'Taskcluster',
          '1457126 - Authorization failures should state which clientId lacks scopes',
          'Rust',
          'None',
          '2018-04-05'
        ),
        createData(
          'Taskcluster',
          '1453714 - Return http 424 instead of 403 for error artifacts',
          'Python',
          'None',
          '2017-12-04'
        ),
        createData(
          'Taskcluster',
          '1451548 - Return 404 for indexes and namespaces that are expired',
          'JS',
          'None',
          '2018-05-04'
        ),
        createData(
          'Servo',
          '1443016 - Create a fake version of azure-blob-storage',
          'JS',
          'None',
          '2018-05-12'
        ),
        createData(
          'Taskcluster',
          '1443017 - Use a mock AWS library to test publishing API definitions',
          'JS',
          'None',
          '2018-05-14'
        ),
        createData(
          'Servo',
          '1436212 - Add pagination to listClients',
          'JS',
          'None',
          '2018-05-20'
        ),
        createData(
          'Taskcluster',
          '1344912 - Support tag events, too',
          'JS',
          'None',
          '2018-01-01'
        ),
        createData(
          'Taskcluster',
          '1306494 - Add a diff+commit submit button to some text areas in tc-tools',
          'JS',
          'None',
          '2018-02-12'
        ),
        createData(
          'Servo',
          '1441960 - Add measure of time to start processing a task',
          'JS',
          'None',
          '2018-05-06'
        ),
        createData(
          'Servo',
          '1446768 - Only post "No taskcluster jobs.." to a PR once',
          'JS',
          'None',
          '2018-05-01'
        ),
        createData(
          'Taskcluster',
          '1441977 - Run tests for taskcluster-treeherder in Taskcluster',
          'JS',
          'None',
          '2018-05-03'
        ),
      ].sort((a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <BugsTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <BugsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow hover tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row" padding="none">
                      {n.project}
                    </TableCell>
                    <TableCell>{n.description}</TableCell>
                    <TableCell>{n.tag}</TableCell>
                    <TableCell>{n.assignedto}</TableCell>
                    <TableCell>{n.lastupdate}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

BugsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BugsTable);

import { Component, Fragment } from 'react';
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
import gql from 'graphql-tag';
import _ from 'lodash';
import BugsTableHead from './BugsTableHead';
import BugsTableEntry from './BugsTableEntry';
import Issues from './issues.graphql';

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
      data: [],
      page: 0,
      rowsPerPage: 5,
      loading: true,
      error: false,
    };
  }

  fetchDataNext(tagRepoList) {
    const { client } = this.props;
    let allQuery = '';

    if (tagRepoList.length === 0) return;

    tagRepoList.forEach((tag, idx) => {
      const noCursorQuery = `_${idx}: search(first:50, type:ISSUE, query:"${
        tag.query
      }")\n
      {
      ...Issues
      }\n`;
      const cursorQuery = `_${idx}: search(first:50, type:ISSUE, query:"${
        tag.query
      }", after:${tag.after})\n
      {
      ...Issues
      }\n`;

      allQuery = tag.after
        ? allQuery.concat(cursorQuery)
        : allQuery.concat(noCursorQuery);
    });
    client
      .query({ query: gql`{${allQuery}}\n${Issues}` })
      .catch(
        () =>
          new Promise(resolve => {
            resolve(false);
          })
      )
      .then(({ data, error, loading }) => {
        const repositoriesData = Object.entries(data).map(([key, value]) => ({
          ...value,
          ...tagRepoList[parseInt(key.split('_')[1], 10)],
        }));
        // issueData is formatted like data in the state
        const issuesData = repositoriesData.reduce(
          (previous, repoData) => [
            ...previous,
            ...repoData.nodes.map(issue => {
              const obj = {
                project: issue.repository.name,
                id: issue.number,
                description: `${issue.number} - ${issue.title}`,
                tag: issue.labels.nodes.map(node => node.name).join(','),
                lastupdate: issue.updatedAt,
                assignedto: issue.assignees.nodes[0]
                  ? issue.assignees.nodes[0].login
                  : 'None',
              };

              return obj;
            }),
          ],
          []
        );
        // list of object with same format as tagRepoList,
        // to fetch next data
        const hasNextPageList = repositoriesData
          .filter(repoData => repoData.pageInfo.hasNextPage)
          .map(repoData => ({
            query: repoData.query,
            label: repoData.label,
            after: repoData.pageInfo.endCursor,
          }));

        this.setState({
          data: _.uniqBy(
            [...this.state.data, ...issuesData],
            'description'
          ).sort((a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)),
          hasNextPageList,
          error,
          loading,
        });
      });
  }

  componentDidMount() {
    const { tagRepoList } = this.props;

    this.fetchDataNext(tagRepoList);
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
    const threshold = 40;
    const { rowsPerPage, data, hasNextPageList } = this.state;

    this.setState({ page });

    if (
      data.length - rowsPerPage * page < threshold &&
      hasNextPageList.length > 0
    ) {
      this.fetchDataNext(hasNextPageList);
    }
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      rowsPerPage,
      page,
      loading,
      error,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Fragment>
        {loading && <div>loading...</div>}
        {error ? (
          <div>error...</div>
        ) : (
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
                      <BugsTableEntry
                        key={n.id}
                        project={n.project}
                        description={n.description}
                        tag={n.tag}
                        assignedto={n.assignedto}
                        lastupdate={n.lastupdate}
                      />
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
              labelDisplayedRows={({ from, to }) => `${from}-${to}`}
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
        )}
      </Fragment>
    );
  }
}

BugsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BugsTable);

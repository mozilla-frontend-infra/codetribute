import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { arrayOf, object } from 'prop-types';
import { camelCase } from 'change-case';
import { formatDistance } from 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { memoizeWith, pipe, sort as rSort, map } from 'ramda';
import { stringify, parse } from 'qs';
import DataTable from '../DataTable';
import sort from '../../utils/sort';
import { ASSIGNEE } from '../../utils/constants';

const sorted = pipe(
  rSort((a, b) => sort(a.summary, b.summary)),
  map(({ project, summary }) => `${summary}-${project}`)
);
const assignments = Object.values(ASSIGNEE);

@withRouter
@withStyles(theme => ({
  summary: {
    whiteSpace: 'nowrap',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  link: {
    textDecoration: 'none',
  },
  tags: {
    whiteSpace: 'nowrap',
  },
  dropdown: {
    minWidth: 200,
  },
  filter: {
    padding: `0px ${3 * theme.spacing.unit}px`,
  },
}))
export default class TasksTable extends Component {
  state = {
    showFilterContent: false,
  };

  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    items: arrayOf(object).isRequired,
  };

  getTableData = memoizeWith(
    (sortBy = 'Last Updated', sortDirection = 'desc', items, assignee) => {
      const ids = sorted(items);

      return `${ids.join('-')}-${sortBy}-${sortDirection}-${assignee}`;
    },
    (sortBy = 'Last Updated', sortDirection = 'desc', items, assignee) => {
      const sortByProperty = camelCase(sortBy);
      let filteredItems = [];

      if (assignee === ASSIGNEE.ANY) {
        filteredItems = items;
      } else if (assignee === ASSIGNEE.ASSIGNED) {
        filteredItems = items.filter(item => item.assignee !== '-');
      } else {
        filteredItems = items.filter(item => item.assignee === '-');
      }

      return [...filteredItems].sort((a, b) => {
        const firstElement =
          sortDirection === 'desc' ? b[sortByProperty] : a[sortByProperty];
        const secondElement =
          sortDirection === 'desc' ? a[sortByProperty] : b[sortByProperty];

        return sort(firstElement, secondElement);
      });
    }
  );

  getQuery() {
    const { location } = this.props;
    const query = parse(location.search.slice(1));

    return query;
  }

  setQuery = query => {
    this.props.history.push({
      search: `?${stringify(query)}`,
    });
  };

  handleFilterToggle = () => {
    this.setState({ showFilterContent: !this.state.showFilterContent });
  };

  handleFilterChange = event => {
    const query = this.getQuery();

    this.setQuery({ ...query, assignee: event.target.value });
  };

  handleHeaderClick = sortBy => {
    if (sortBy === 'Tags') {
      return;
    }

    const query = this.getQuery();
    const toggled = query.sortDirection === 'desc' ? 'asc' : 'desc';
    const sortDirection = query.sortBy === sortBy ? toggled : 'desc';

    this.setQuery({ ...query, sortBy, sortDirection });
  };

  render() {
    const { items, classes } = this.props;
    const { showFilterContent } = this.state;
    const { sortBy, sortDirection, assignee } = this.getQuery();
    const assignment = assignments.includes(assignee)
      ? assignee
      : ASSIGNEE.UNASSIGNED;
    const data = this.getTableData(sortBy, sortDirection, items, assignee);

    return (
      <div className={classes.tableWrapper}>
        <DataTable
          title="Bugs & Issues"
          items={data}
          renderRow={item => (
            <TableRow
              hover
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              key={item.summary}
              component="a"
              href={item.url}
              className={classes.link}>
              <TableCell component="th" scope="row">
                {item.project}
              </TableCell>
              <TableCell className={classes.summary}>{item.summary}</TableCell>
              <TableCell className={classes.tags}>
                {item.tags.map(tag => (
                  <Chip key={tag} label={tag} className={classes.chip} />
                ))}
              </TableCell>
              <TableCell>{item.assignee}</TableCell>
              <TableCell>
                {formatDistance(item.lastUpdated, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          )}
          headers={['Project', 'Summary', 'Tags', 'Assignee', 'Last Updated']}
          sortByHeader={sortBy}
          sortDirection={sortDirection}
          onHeaderClick={this.handleHeaderClick}
          filters={
            showFilterContent && (
              <div className={classes.filter}>
                <TextField
                  select
                  label="Assignee"
                  value={assignment}
                  className={classes.dropdown}
                  onChange={this.handleFilterChange}>
                  {assignments.map(assignee => (
                    <MenuItem key={assignee} value={assignee}>
                      {assignee}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            )
          }
          onFilterClick={this.handleFilterToggle}
        />
      </div>
    );
  }
}

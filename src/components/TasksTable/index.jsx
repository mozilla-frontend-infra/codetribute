import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { arrayOf, object } from 'prop-types';
import { camelCase } from 'change-case';
import { formatDistance } from 'date-fns';
import { memoizeWith, pipe, sort as rSort, map } from 'ramda';
import { stringify, parse } from 'qs';
import DataTable from '../DataTable';
import sort from '../../utils/sort';

const sorted = pipe(
  rSort((a, b) => sort(a.summary, b.summary)),
  map(({ project, summary }) => `${summary}-${project}`)
);

@withRouter
@withStyles(() => ({
  summary: {
    whiteSpace: 'nowrap',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  link: {
    textDecoration: 'none',
  },
  chip: {
    marginRight: 1,
  },
  tags: {
    whiteSpace: 'nowrap',
  },
}))
export default class TasksTable extends Component {
  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    items: arrayOf(object).isRequired,
  };

  getTableData = memoizeWith(
    (sortBy, sortDirection, items) => {
      const ids = sorted(items);

      return `${ids.join('-')}-${sortBy}-${sortDirection}`;
    },
    (sortBy, sortDirection, items) => {
      const sortByProperty = camelCase(sortBy);

      if (!sortBy) {
        return items;
      }

      return [...items].sort((a, b) => {
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

    return {
      sortBy: query.sortBy ? query.sortBy : 'Last Updated',
      sortDirection: query.sortDirection ? query.sortDirection : 'desc',
    };
  }

  handleHeaderClick = sortBy => {
    const query = this.getQuery();
    const toggled = query.sortDirection === 'desc' ? 'asc' : 'desc';
    const sortDirection = query.sortBy === sortBy ? toggled : 'desc';

    this.props.history.push({
      search: `?${stringify({
        sortBy,
        sortDirection,
      })}`,
    });
  };

  render() {
    const { items, classes } = this.props;
    const { sortBy, sortDirection } = this.getQuery();
    const data = this.getTableData(sortBy, sortDirection, items);

    return (
      <div className={classes.tableWrapper}>
        <DataTable
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
                {item.tag.map(tag => (
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
          headers={['Project', 'Summary', 'Tag', 'Assignee', 'Last Updated']}
          sortByHeader={sortBy}
          sortDirection={sortDirection}
          onHeaderClick={this.handleHeaderClick}
        />
      </div>
    );
  }
}

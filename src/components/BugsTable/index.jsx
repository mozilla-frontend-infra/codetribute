import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { arrayOf, object } from 'prop-types';
import { camelCase } from 'change-case';
import { memoizeWith } from 'ramda';
import DataTable from '../DataTable';

@withStyles(() => ({
  summary: {
    whiteSpace: 'nowrap',
  },
}))
export default class BugsTable extends Component {
  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    items: arrayOf(object).isRequired,
  };

  state = {
    sortBy: null,
    sortDirection: null,
  };

  getTableData = memoizeWith(
    ({ sortBy, sortDirection }) => `${sortBy}-${sortDirection}`,
    ({ sortBy, sortDirection, items }) => {
      const sortByProperty = camelCase(sortBy);

      if (!items) {
        return null;
      }

      if (!sortBy) {
        return items;
      }

      return items.sort((a, b) => {
        if (sortDirection === 'desc')
          return b[sortByProperty] < a[sortByProperty] ? -1 : 1;

        return a[sortByProperty] < b[sortByProperty] ? -1 : 1;
      });
    }
  );

  handleHeaderClick = sortBy => {
    const toggled = this.state.sortDirection === 'desc' ? 'asc' : 'desc';
    const sortDirection = this.state.sortBy === sortBy ? toggled : 'desc';

    this.setState({ sortBy, sortDirection });
  };

  render() {
    const { items, classes } = this.props;
    const { sortBy, sortDirection } = this.state;
    const data = this.getTableData({ sortBy, sortDirection, items });

    return (
      <DataTable
        items={data}
        renderRow={item => (
          <TableRow hover tabIndex={-1} key={`${item.project}-${item.summary}`}>
            <TableCell component="th" scope="row">
              {item.project}
            </TableCell>
            <TableCell className={classes.summary}>{item.summary}</TableCell>
            <TableCell>{item.tag}</TableCell>
            <TableCell>{item.assignee}</TableCell>
            <TableCell>{item.lastUpdated}</TableCell>
          </TableRow>
        )}
        headers={['Project', 'Summary', 'Tag', 'Assignee', 'Last Updated']}
        sortByHeader={sortBy}
        sortDirection={sortDirection}
        onHeaderClick={this.handleHeaderClick}
      />
    );
  }
}

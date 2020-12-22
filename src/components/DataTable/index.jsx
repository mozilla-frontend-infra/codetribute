import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { arrayOf, func, string, oneOf, object } from 'prop-types';

@withStyles((theme) => ({
  table: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    overflowX: 'auto',
  },
}))
class DataTable extends Component {
  handleHeaderClick = ({ target }) => {
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(target.id);
    }
  };

  render() {
    const {
      classes,
      renderRow,
      sortByHeader,
      sortDirection,
      headers,
      items,
    } = this.props;
    const colSpan = (headers && headers.length) || 0;

    return (
      <Table className={classes.table} aria-labelledby="tableTitle">
        {headers && (
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={`table-header-${header}`}>
                  <TableSortLabel
                    id={header}
                    active={header === sortByHeader}
                    direction={sortDirection || 'desc'}
                    onClick={this.handleHeaderClick}>
                    {header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan}>
                <em>No items for this page.</em>
              </TableCell>
            </TableRow>
          ) : (
            items.map(renderRow)
          )}
        </TableBody>
      </Table>
    );
  }
}
DataTable.propTypes = {
  /**
   * A function to execute for each row to render in the table.
   * Will be passed a datum from the table data. The function
   * should return the JSX necessary to render the given row.
   */
  renderRow: func,
  /**
   * A function to execute when a column header is clicked.
   * Will receive a single argument which is the column name.
   * This can be used to handle sorting.
   */
  onHeaderClick: func,
  /**
   * A header name to sort on.
   */
  sortByHeader: string,
  /**
   * The sorting direction.
   */
  sortDirection: oneOf(['desc', 'asc']),
  /**
   * A list of header names to use on the table starting from the left.
   */
  headers: arrayOf(string),
  /**
   * A list of objects to display. Each element in the list is represented
   * by a row and each element's key-value pair represents a column.
   */
  items: arrayOf(object).isRequired,
};

DataTable.defaultProps = {
  sortByHeader: null,
  sortDirection: 'desc',
  headers: null,
  onHeaderClick: null,
  renderRow: null,
};

export default DataTable;

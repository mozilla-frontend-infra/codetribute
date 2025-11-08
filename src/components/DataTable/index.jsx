import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

@withStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
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
export default DataTable;

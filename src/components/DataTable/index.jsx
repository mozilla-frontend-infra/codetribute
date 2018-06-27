import { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FilterVariantIcon from 'mdi-react/FilterVariantIcon';
import { arrayOf, func, string, oneOf, object, node } from 'prop-types';

@withStyles(theme => ({
  table: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    overflowX: 'auto',
  },
  title: {
    flex: '1 1 100%',
  },
}))
class DataTable extends Component {
  static propTypes = {
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
    /**
     * Node that carry filter options.
     */
    filters: node,
    /**
     * A function to execute when the filter icon is clicked.
     */
    onFilterClick: func,
    /**
     * The title of the table.
     */
    title: string,
  };

  static defaultProps = {
    sortByHeader: null,
    sortDirection: 'desc',
    filters: null,
  };

  handleHeaderClick = ({ target }) => {
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(target.id);
    }
  };

  handleFilterClick = () => {
    if (this.props.onFilterClick) {
      this.props.onFilterClick();
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
      title,
      filters,
    } = this.props;
    const colSpan = (headers && headers.length) || 0;

    return (
      <Fragment>
        {title && (
          <Toolbar>
            <Typography variant="title" className={classes.title}>
              {title}
            </Typography>
            <IconButton onClick={this.handleFilterClick}>
              <FilterVariantIcon onClick={this.handleFilterClick} />
            </IconButton>
          </Toolbar>
        )}
        {filters}
        <Table className={classes.table} aria-labelledby="tableTitle">
          {headers && (
            <TableHead>
              <TableRow>
                {headers.map(header => (
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
      </Fragment>
    );
  }
}

export default DataTable;

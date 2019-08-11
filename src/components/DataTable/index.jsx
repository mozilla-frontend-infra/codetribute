import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { arrayOf, func, string, oneOf } from 'prop-types';
import { InfiniteLoader, AutoSizer, Column, Table } from 'react-virtualized';

@withStyles({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
})
class DataTable extends Component {
  static propTypes = {
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
  };

  static defaultProps = {
    headerHeight: 56,
    rowHeight: 51,
    sortByHeader: null,
    sortDirection: 'desc',
    headers: null,
    onHeaderClick: null,
    renderItem: null,
  };

  handleHeaderClick = ({ target }) => {
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(target.id);
    }
  };

  getRowClassName = () => {
    const { classes } = this.props;

    return classes.flexContainer;
  };

  headerRenderer = ({ label }) => {
    const { headerHeight, classes, sortByHeader, sortDirection } = this.props;

    return (
      <TableCell
        className={classes.flexContainer}
        variant="head"
        style={{ height: headerHeight }}>
        <TableSortLabel
          id={label}
          active={label === sortByHeader}
          direction={sortDirection || 'desc'}
          onClick={this.handleHeaderClick}>
          {label}
        </TableSortLabel>
      </TableCell>
    );
  };

  componentDidMount = async () => {
    await this.props.loadNextPage();
  };

  render() {
    const {
      classes,
      columns,
      hasNextPage,
      isNextPageLoading,
      loadNextPage,
      cellRenderer,
      onHeaderClick,
      sortByHeader,
      sortDirection,
      rowCount,
      ...tableProps
    } = this.props;
    const itemCount = hasNextPage ? rowCount + 1 : rowCount;
    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
    const isItemLoaded = ({ index }) => !hasNextPage || index < rowCount;

    return (
      <InfiniteLoader
        isRowLoaded={isItemLoaded}
        loadMoreRows={loadMoreItems}
        rowCount={itemCount}>
        {({ onRowsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => {
              return (
                <Table
                  height={height}
                  width={width}
                  onRowsRendered={onRowsRendered}
                  ref={ref}
                  rowCount={rowCount}
                  {...tableProps}
                  rowClassName={this.getRowClassName}>
                  {columns.map(({ dataKey, ...other }, index) => {
                    return (
                      <Column
                        key={dataKey}
                        headerRenderer={headerProps =>
                          this.headerRenderer({
                            ...headerProps,
                            columnIndex: index,
                          })
                        }
                        className={classes.flexContainer}
                        cellRenderer={cellRenderer}
                        dataKey={dataKey}
                        {...other}
                      />
                    );
                  })}
                </Table>
              );
            }}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default DataTable;

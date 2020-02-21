import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { arrayOf, func, string, oneOf, object, number, bool } from 'prop-types';
import {
  InfiniteLoader,
  AutoSizer,
  Column,
  Table,
  WindowScroller,
} from 'react-virtualized';

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
     * The height of headers.
     */
    headerHeight: number,

    /**
     * An array of each column's width and name.
     */
    columns: arrayOf(object),

    /**
     * Whether there is a next page.
     */
    hasNextPage: bool,

    /**
     * Whether next page is loading.
     */
    isNextPageLoading: bool,

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
     * Number of rows.
     */
    rowCount: number,

    /**
     * A function to execute when next page is to be loaded.
     * No arguments are needed.
     * This can be used to get more data from the APIs.
     */
    loadNextPage: func,

    /**
     * A function to execute when a cell is gonna be rendered.
     * Will recieve a single argument which is an object with data and index.
     * This can be used to turn the data into cell react elements.
     */
    cellRenderer: func,

    /**
     * A function to execute when a row's data is needed.
     * Will recieve a single argument which is the index of the row.
     * This can be used to get a row's data.
     */
    rowGetter: func,
  };

  static defaultProps = {
    headerHeight: 56,
    rowHeight: 51,
    sortByHeader: null,
    sortDirection: 'desc',
    headers: null,
    onHeaderClick: null,
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

  componentDidMount = async () => {
    await this.props.loadNextPage();
  };

  render() {
    const {
      classes,
      headerHeight,
      columns,
      hasNextPage,
      isNextPageLoading,
      sortByHeader,
      sortDirection,
      rowCount,
      loadNextPage,
      cellRenderer,
      onHeaderClick,
      ...tableProps
    } = this.props;
    const itemCount = hasNextPage ? rowCount + 1 : rowCount;
    const isItemLoaded = ({ index }) => !hasNextPage || index < rowCount;

    return (
      <InfiniteLoader
        isRowLoaded={isItemLoaded}
        loadMoreRows={loadNextPage}
        rowCount={itemCount}>
        {({ onRowsRendered, ref }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                  <Table
                    autoHeight
                    height={height}
                    width={Math.max(width, 1450)}
                    onRowsRendered={onRowsRendered}
                    ref={ref}
                    rowCount={rowCount}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    headerHeight={headerHeight}
                    {...tableProps}
                    rowClassName={this.getRowClassName}
                    scrollTop={scrollTop}
                    noRowsRenderer={() =>
                      !isNextPageLoading && (
                        <TableCell
                          style={{
                            verticalAlign: 'middle',
                            height: 56,
                          }}
                          width={columns.reduce(
                            (sum, { width }) => sum + width,
                            0
                          )}>
                          <em style={{ color: 'black' }}>
                            No items for this page.
                          </em>
                        </TableCell>
                      )
                    }>
                    {columns.map(({ dataKey, ...other }) => (
                      <Column
                        key={dataKey}
                        headerRenderer={({ label }) => (
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
                        )}
                        className={classes.flexContainer}
                        cellRenderer={cellRenderer}
                        dataKey={dataKey}
                        {...other}
                      />
                    ))}
                  </Table>
                )}
              </WindowScroller>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default DataTable;

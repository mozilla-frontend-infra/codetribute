import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { func, string } from 'prop-types';

const columns = [
  { id: 'project', numeric: false, label: 'Project' },
  {
    id: 'description',
    numeric: false,
    label: 'Description (#ID)',
  },
  { id: 'tag', numeric: false, label: 'Tag' },
  {
    id: 'assignedto',
    numeric: false,
    label: 'Assigned To',
  },
  {
    id: 'lastupdate',
    numeric: false,
    label: 'Last update',
  },
];

class BugsTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columns.map(
            column => (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding="default"
                sortDirection={orderBy === column.id ? order : false}>
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}>
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

BugsTableHead.propTypes = {
  // function to call when user select sorting option
  onRequestSort: func.isRequired,
  // column which is chosen as the variable for sorting
  order: string.isRequired,
  // asc or desc
  orderBy: string.isRequired,
};

export default BugsTableHead;

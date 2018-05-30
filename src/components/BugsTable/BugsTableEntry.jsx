import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class BugsTableEntry extends Component {
  render() {
    return (
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row" padding="none">
          {this.props.project}
        </TableCell>
        <TableCell>{this.props.description}</TableCell>
        <TableCell>{JSON.stringify(this.props.tag)}</TableCell>
        <TableCell>{this.props.assignedto}</TableCell>
        <TableCell>{this.props.lastupdate}</TableCell>
      </TableRow>
    );
  }
}

export default BugsTableEntry;

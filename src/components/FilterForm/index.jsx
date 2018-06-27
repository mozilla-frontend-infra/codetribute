import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { func, string } from 'prop-types';
import { ASSIGNEE } from '../../utils/constants';

const assigneeList = Object.values(ASSIGNEE);

@withRouter
@withStyles(theme => ({
  root: {
    margin: `0px ${3 * theme.spacing.unit}px`,
    maxWidth: 360,
  },
}))
export default class FilterForm extends Component {
  static propTypes = {
    /**
     * The current assignee value used to filter items.
     */
    assignee: string,
    /**
     * The handler for clicking filter items to update the query string.
     */
    onFilterItemClick: func,
  };

  getSelectedAssignee() {
    const { assignee } = this.props;

    return assigneeList.indexOf(assignee) > -1 ? assignee : ASSIGNEE.UNASSIGNED;
  }

  handleFilterItemClick = event => {
    this.props.onFilterItemClick({ assignee: event.target.value });
  };

  render() {
    const selectedAssignee = this.getSelectedAssignee();
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          select
          label="Assignee"
          value={selectedAssignee}
          onChange={this.handleFilterItemClick}>
          {assigneeList.map(assignee => (
            <MenuItem key={assignee} value={assignee}>
              {assignee}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

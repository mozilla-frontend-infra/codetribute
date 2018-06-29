import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from 'mdi-react/CheckIcon';
import { func, string } from 'prop-types';
import { ASSIGNEE } from '../../utils/constants';

const assigneeList = Object.values(ASSIGNEE);

@withRouter
@withStyles(theme => ({
  root: {
    margin: `0px ${3 * theme.spacing.unit}px`,
  },
  icon: {
    verticalAlign: 'middle',
  },
  dropdown: {
    minWidth: 200,
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
    onFilterChange: func,
  };

  handleFilterChange = event => {
    this.props.onFilterChange({ assignee: event.target.value });
  };

  render() {
    const { classes, assignee } = this.props;
    const assignment = assigneeList.includes(assignee)
      ? assignee
      : ASSIGNEE.UNASSIGNED;

    return (
      <div className={classes.root}>
        <TextField
          select
          label="Assignee"
          value={assignment}
          className={classes.dropdown}
          onChange={this.handleFilterChange}>
          {assigneeList.map(assignee => (
            <MenuItem key={assignee} value={assignee}>
              {assignee}
              {assignee === assignment && (
                <CheckIcon className={classes.icon} />
              )}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

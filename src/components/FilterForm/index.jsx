import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import { parse, stringify } from 'qs';
import AccountIcon from 'mdi-react/AccountIcon';
import { ASSIGNEE } from '../../utils/constants';

const assigneeList = Object.values(ASSIGNEE);

@withRouter
@withStyles(theme => ({
  root: {
    margin: `0px ${3 * theme.spacing.unit}px`,
    maxWidth: 360,
  },
}))
export default class FilterMenu extends Component {
  state = {
    anchorEl: null,
  };

  getSelectedAssignee() {
    const { assignee } = this.getQuery();

    return assigneeList.indexOf(assignee) > -1 ? assignee : ASSIGNEE.UNASSIGNED;
  }

  getQuery() {
    const { location } = this.props;
    const query = parse(location.search.slice(1));

    return query;
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, assignee) => {
    this.setState({ anchorEl: null });
    this.props.history.push({
      search: `?${stringify({
        ...this.getQuery(),
        assignee,
      })}`,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const selectedAssignee = this.getSelectedAssignee();
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Assignee"
            onClick={this.handleClickListItem}>
            <ListItemIcon className={classes.icon}>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Assignee" secondary={selectedAssignee} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          {assigneeList.map(assignee => (
            <MenuItem
              key={assignee}
              selected={assignee === selectedAssignee}
              onClick={event => this.handleMenuItemClick(event, assignee)}>
              {assignee}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

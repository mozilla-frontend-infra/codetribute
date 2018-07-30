import { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import WebIcon from 'mdi-react/WebIcon';
import classNames from 'classnames';

@withStyles(theme => ({
  active: {
    background: theme.palette.action.selected,
  },
}))
export default class Sidebar extends Component {
  handleItemClick = () => {
    this.props.onItemClick();
  };
  render() {
    const { items, activeItem, classes } = this.props;

    return (
      <List disablePadding>
        {items.map(item => (
          <ListItem
            className={classNames({
              [classes.active]: activeItem === item.text,
            })}
            button
            onClick={this.handleItemClick}
            id={item.text}
            key={item.text}
            component={Link}
            to={`/languages/${item.text}`}>
            <ListItemIcon>{item.icon || <WebIcon />}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

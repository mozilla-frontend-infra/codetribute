import { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import WebIcon from 'mdi-react/WebIcon';
import classNames from 'classnames';
import LanguagePythonIcon from 'mdi-react/LanguagePythonIcon';
import LanguageCppIcon from 'mdi-react/LanguageCppIcon';
import LanguageCIcon from 'mdi-react/LanguageCIcon';
import LanguageJavascriptIcon from 'mdi-react/LanguageJavascriptIcon';
import LanguageCsharpIcon from 'mdi-react/LanguageCsharpIcon';
import LanguageCss3Icon from 'mdi-react/LanguageCss3Icon';
import LanguageSwiftIcon from 'mdi-react/LanguageSwiftIcon';
import { BUGZILLA_LANGUAGE_MAPPING } from '../../utils/constants';

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
    const { activeItem, classes } = this.props;
    const icons = {
      Python: <LanguagePythonIcon />,
      Javascript: <LanguageJavascriptIcon />,
      Swift: <LanguageSwiftIcon />,
      C: <LanguageCIcon />,
      'C++': <LanguageCppIcon />,
      'C#': <LanguageCsharpIcon />,
      CSS3: <LanguageCss3Icon />,
    };
    const items = Object.keys(BUGZILLA_LANGUAGE_MAPPING).map(text => ({
      text,
      icon: icons[text],
    }));

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

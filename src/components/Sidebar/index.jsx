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
import { BUGZILLA_LANGUAGES } from '../../utils/constants';

@withStyles(theme => ({
  active: {
    '& $text': {
      color: theme.palette.primary.main,
    },
    '& svg': {
      fill: theme.palette.primary.main,
    },
  },
  text: {
    color: theme.palette.grey[800],
    fontFamily: 'Roboto500',
  },
}))
export default class Sidebar extends Component {
  render() {
    const { activeItem, classes } = this.props;
    const icons = {
      Python: <LanguagePythonIcon />,
      JavaScript: <LanguageJavascriptIcon />,
      Swift: <LanguageSwiftIcon />,
      C: <LanguageCIcon />,
      'C++': <LanguageCppIcon />,
      'C#': <LanguageCsharpIcon />,
      CSS: <LanguageCss3Icon />,
    };

    return (
      <List disablePadding>
        {Object.keys(BUGZILLA_LANGUAGES).map(item => (
          <ListItem
            className={classNames({
              [classes.active]: activeItem === item,
            })}
            button
            onClick={this.props.onItemClick}
            id={item}
            key={item}
            component={Link}
            to={`/languages/${item}`}>
            <ListItemIcon>{icons[item] || <WebIcon />}</ListItemIcon>
            <ListItemText disableTypography className={classes.text}>
              {item}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';

@withStyles((theme) => ({
  root: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main},
     ${theme.palette.secondary.main}
      90%)`,
    paddingTop: theme.spacing.unit,
  },
}))
class CustomAppBar extends Component {
  render() {
    const { children, classes, className, ...props } = this.props;

    return (
      <AppBar className={classNames(classes.root, className)} {...props}>
        {children}
      </AppBar>
    );
  }
}

export default CustomAppBar;

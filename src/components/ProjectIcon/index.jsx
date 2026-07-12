import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

export default
@withStyles((theme) => ({
  projectIcon: {
    color: theme.palette.secondary.dark,
  },
}))
class ProjectIcon extends Component {
  render() {
    const { icon, classes } = this.props;

    if (!icon) {
      return <img height="45" src="/icons/dino.svg" alt="" />;
    }

    const iconSrc = `/icons/${icon}.svg`;
    return <img height="45" src={iconSrc} alt="" />;
  }
}

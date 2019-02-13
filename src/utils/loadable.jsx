import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../components/Spinner';

@withStyles(theme => ({
  view: {
    textAlign: 'center',
    margin: 100,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 60px)',
    marginTop: 60,
  },
}))
export default class Loading extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.view}>
        <Spinner />
      </div>
    );
  }
}

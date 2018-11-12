import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

@withStyles({
  center: {
    textAlign: 'center',
  },
})
export default class Spinner extends PureComponent {
  render() {
    const { classes, className } = this.props;

    return (
      <div className={classNames(classes.center, className)}>
        <CircularProgress thickness={5} color="primary" />
      </div>
    );
  }
}

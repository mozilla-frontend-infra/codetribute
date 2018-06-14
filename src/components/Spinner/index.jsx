import { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

@withStyles({
  center: {
    textAlign: 'center',
  },
})
export default class Spinner extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <CircularProgress thickness={5} />
      </div>
    );
  }
}

import { PureComponent } from 'react';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

@withStyles(theme => ({
  view: {
    textAlign: 'center',
    margin: 100,
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 3 * theme.spacing.unit,
    height: 'calc(100% - 60px)',
    marginTop: 60,
    overflowX: 'auto',
  },
  spinner: {
    color: theme.palette.primary.main,
  },
}))
class Loading extends PureComponent {
  content() {
    const { classes, error, timedOut, pastDelay } = this.props;

    if (error) {
      throw error;
    } else if (timedOut || pastDelay) {
      return (
        <CircularProgress
          size={50}
          classes={{
            circleIndeterminate: classes.spinner,
          }}
        />
      );
    }

    return null;
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.view}>{this.content()}</div>;
  }
}

export default loader =>
  Loadable({
    loader,
    loading: Loading,
  });

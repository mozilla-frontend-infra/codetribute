import { PureComponent } from 'react';
import Loadable from 'react-loadable';
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
class Loading extends PureComponent {
  content() {
    const { error, timedOut, pastDelay } = this.props;

    if (error) {
      throw error;
    } else if (timedOut || pastDelay) {
      return <Spinner />;
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
    timeout: 10000,
  });

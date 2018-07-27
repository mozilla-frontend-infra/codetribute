import { Fragment, PureComponent } from 'react';
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
    const { classes, error, timedOut, pastDelay } = this.props;

    if (error) {
      throw error;
    } else if (timedOut || pastDelay) {
      return <Spinner className={classes.view} />;
    }

    return null;
  }

  render() {
    return <Fragment>{this.content()}</Fragment>;
  }
}

export default loader =>
  Loadable({
    loader,
    loading: Loading,
    timeout: 10000,
  });

import { Component } from 'react';
import { instanceOf, oneOfType, string } from 'prop-types';
import classNames from 'classnames';
import Markdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ErrorBox from './ErrorBox';

@withStyles(theme => ({
  paper: {
    padding: `0 ${2 * theme.spacing.unit / 3}px`,
    display: 'flex',
    justifyContent: 'space-between',
  },
  pad: {
    paddingTop: 9,
    paddingBottom: 9,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    borderColor: theme.palette.error.light,
    marginBottom: theme.spacing.unit,
  },
  disabled: {
    opacity: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))
/**
 * Render an error in a panel. Will be expandable display stack traces
 * when in development
 */
export default class ErrorPanel extends Component {
  static propTypes = {
    /**
     * Error to display
     */
    error: oneOfType([string, instanceOf(Error)]).isRequired,
  };

  render() {
    const { classes, error } = this.props;
    const showStack =
      process.env.NODE_ENV === 'development' && error instanceof Error;
    const markdown = (
      <Markdown
        className={classNames({
          [classes.pad]: !showStack,
        })}>
        {typeof error === 'string' ? error : error.message}
      </Markdown>
    );

    if (!showStack) {
      return (
        <Paper className={classNames(classes.paper, classes.error)}>
          {markdown}
        </Paper>
      );
    }

    return (
      <ExpansionPanel className={classes.error} disabled={!showStack}>
        <ExpansionPanelSummary
          classes={{ disabled: classes.disabled }}
          expandIcon={<ChevronDownIcon />}>
          {markdown}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ErrorBox error={error} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

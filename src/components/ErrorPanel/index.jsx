import React, { Component } from 'react';
import { instanceOf, oneOfType, string } from 'prop-types';
import classNames from 'classnames';
import Markdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Paper from '@material-ui/core/Paper';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ErrorBox from './ErrorBox';

@withStyles((theme) => ({
  paper: {
    padding: `0 ${theme.spacing(2)}px`,
    display: 'flex',
    justifyContent: 'space-between',
  },
  pad: {
    paddingTop: 9,
    paddingBottom: 9,
  },
  error: {
    backgroundColor: theme.palette.error.main,
    borderColor: theme.palette.error.light,
    marginBottom: theme.spacing(1),
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  disabled: {
    opacity: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  errorText: {
    color: theme.palette.common.white,
  },
}))
/**
 * Render an error in a panel. Will be expandable display stack traces
 * when in development
 */
export default class ErrorPanel extends Component {
  render() {
    const { classes, error } = this.props;
    const showStack =
      process.env.NODE_ENV === 'development' && error instanceof Error;
    const markdown = (
      <Markdown
        className={classNames(classes.errorText, {
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
      <Accordion className={classes.error} disabled={!showStack}>
        <AccordionSummary
          classes={{ disabled: classes.disabled }}
          expandIcon={<ChevronDownIcon />}>
          {markdown}
        </AccordionSummary>
        <AccordionDetails>
          <ErrorBox error={error} />
        </AccordionDetails>
      </Accordion>
    );
  }
}
ErrorPanel.propTypes = {
  /**
   * Error to display
   */
  error: oneOfType([string, instanceOf(Error)]).isRequired,
};

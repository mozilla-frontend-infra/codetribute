import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { arrayOf, object } from 'prop-types';

@withStyles(theme => ({
  paper: {
    minHeight: 100,
    padding: `${theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 1px 4px 0 ${theme.palette.primary.light}`,
    },
  },
  '@media screen and (min-width: 900px)': {
    paper: {
      width: 900,
    },
  },
  title: {
    flex: '1 1 100%',
  },
}))
export default class TasksList extends Component {
  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    data: arrayOf(object),
  };

  render() {
    const { data, classes, renderRow } = this.props;

    return (
      <Grid container direction="column" alignItems="center" spacing={16}>
        {data.map(item => (
          <Grid item xs={12} key={item.summary}>
            <Paper className={classNames(classes.paper)}>
              {renderRow(item)}
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
}

import { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { arrayOf, object } from 'prop-types';

@withStyles(theme => ({
  paper: {
    minHeight: 100,
    paddingBottom: theme.spacing.unit,
  },
  '@media screen and (max-width: 900px)': {
    paper: {
      width: '90vw',
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
            <Card raised className={classes.paper}>
              {renderRow(item)}
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

import { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { arrayOf, func, object } from 'prop-types';

@withStyles(theme => ({
  paper: {
    minHeight: 100,
    position: 'relative',
    paddingBottom: theme.spacing.unit,
  },
}))
export default class TasksList extends Component {
  static propTypes = {
    /**
     * A list of tasks to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    items: arrayOf(object).isRequired,
    /**
     * A function to execute for each row to render in the table.
     * Will be passed a datum from the table data. The function
     * should return the JSX necessary to render the given row.
     */
    renderRow: func,
  };

  render() {
    const { items, classes, renderRow } = this.props;

    return (
      <Grid container alignItems="flex-start" spacing={24}>
        {items.map(item => (
          <Grid item xs={12} sm={4} md={3} lg={3} xl={2} key={item.summary}>
            <Card className={classes.paper}>{renderRow(item)}</Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

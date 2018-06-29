import { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { formatDistance } from 'date-fns';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import LinkIcon from 'mdi-react/LinkIcon';
import { arrayOf, object, string, node } from 'prop-types';

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
  chip: {
    marginTop: `${0.5 * theme.spacing.unit}px`,
  },
  title: {
    flex: '1 1 100%',
  },
  link: {
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    marginLeft: 2,
    verticalAlign: 'super',
  },
}))
export default class TasksList extends Component {
  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    data: arrayOf(object),
    /**
     * Icon Buttons for user to select display options
     */
    viewOptions: node,
    /**
     * The title of the list.
     */
    title: string,
  };

  render() {
    const { data, classes } = this.props;

    return (
      <Fragment>
        <Grid container direction="column" alignItems="center" spacing={16}>
          {data.map(item => (
            <Grid item xs={12} key={item.summary}>
              <Paper className={classNames(classes.paper)}>
                <Typography
                  variant="title"
                  target="_blank"
                  rel="noopener noreferrer"
                  component="a"
                  href={item.url}
                  className={classes.link}>
                  {item.summary}
                  <LinkIcon className={classes.icon} size={14} />
                </Typography>
                <Divider light />
                <Typography component="p">
                  Project: <strong>{item.project}</strong> | Assignee:{' '}
                  <strong>{item.assignee}</strong> | Last Update:{' '}
                  {formatDistance(item.lastUpdated, new Date(), {
                    addSuffix: true,
                  })}
                </Typography>
                <div className={classes.chips}>
                  {item.tags.map(tag => (
                    <Chip key={tag} label={tag} className={classes.chip} />
                  ))}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

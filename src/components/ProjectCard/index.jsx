import { Component } from 'react';
import { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Markdown from 'react-markdown';

@withStyles(theme => ({
  card: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    minHeight: 250,
  },
  textAlign: {
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#999999',
    fontWeight: 300,
    lineHeight: '1.5em',
    fontSize: '1em',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontWeight: 300,
    padding: 2 * theme.spacing.unit,
  },
  cardActions: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
  },
}))
export default class ProjectCard extends Component {
  static propTypes = {
    title: string.isRequired,
    description: string,
  };

  static defaultProps = {
    description: null,
  };

  render() {
    const { classes, title, description } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.textAlign}>
          <Typography gutterBottom variant="title" component="h4">
            {title}
          </Typography>
          {description && (
            <Typography className={classes.cardDescription}>
              <Markdown source={description} />
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color="primary">VIEW PROJECT</Button>
        </CardActions>
      </Card>
    );
  }
}

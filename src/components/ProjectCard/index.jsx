import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Typography,
} from 'material-ui';
import { Component } from 'react';
import { object, node, string } from 'prop-types';
import ReactMarkdown from 'react-markdown';

@withStyles(() => ({
  card: {
    marginTop: '30px',
    textAlign: 'center',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: '25px 0',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '3px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
    minHeight: '250px',
  },
  textAlign: {
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#999999',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
    fontSize: '1em',
    textTransform: 'uppercase',
    marginTop: '10px',
    marginBottom: '10px',
  },
  cardTitle: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
    fontSize: '1.3em',
    marginTop: '10px',
    marginBottom: '10px',
  },
  cardDescription: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
    padding: '15px 20px',
    margin: '0 0 10px',
  },
  cardActions: {
    position: 'absolute',
    right: '0',
    left: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
  },
}))
export default class ProjectCard extends Component {
  static propTypes = {
    classes: object.isRequired,
    title: node,
    subtitle: node,
    description: node,
    footer: node,
    avatar: string,
  };

  static defaultProps = {
    subtitle: null,
  };

  render() {
    const { classes, subtitle, title, description, footer } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.textAlign}>
          {subtitle && (
            <Typography component="h6" className={classes.cardSubtitle}>
              {subtitle}
            </Typography>
          )}
          {title && (
            <Typography component="h4" className={classes.cardTitle}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography className={classes.cardDescription}>
              <ReactMarkdown source={description} />
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.cardActions}>{footer}</CardActions>
      </Card>
    );
  }
}

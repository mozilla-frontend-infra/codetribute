import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Typography,
} from 'material-ui';
import { object, node, string } from 'prop-types';
import ReactMarkdown from 'react-markdown';

const styles = () => ({
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
    height: 'auto',
    display: 'inline',
  },
});

function ProjectCard({ ...props }) {
  const { classes, subtitle, title, description, footer } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.textAlign}>
        {subtitle !== undefined ? (
          <Typography component="h6" className={classes.cardSubtitle}>
            {subtitle}
          </Typography>
        ) : null}
        {title !== undefined ? (
          <Typography component="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        ) : null}
        {description !== undefined ? (
          <Typography className={classes.cardDescription}>
            <ReactMarkdown source={description} />
          </Typography>
        ) : null}
      </CardContent>
      <CardActions className={classes.cardActions}>{footer}</CardActions>
    </Card>
  );
}

ProjectCard.propTypes = {
  classes: object.isRequired,
  title: node,
  subtitle: node,
  description: node,
  footer: node,
  avatar: string,
};

ProjectCard.defaultProps = {
  avatar: '',
  subtitle: null,
};

export default withStyles(styles)(ProjectCard);

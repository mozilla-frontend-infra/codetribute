import { Component } from 'react';
import { string, shape } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Markdown from 'react-markdown';

@withStyles(theme => ({
  card: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    minHeight: 250,
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 1px 4px 0 ${theme.palette.primary.dark}`,
    },
  },
  textAlign: {
    textAlign: 'center',
  },
  projectSummary: {
    fontWeight: 300,
    padding: 2 * theme.spacing.unit,
  },
  navlink: {
    textDecoration: 'none',
  },
}))
export default class ProjectCard extends Component {
  static propTypes = {
    project: shape({
      name: string.isRequired,
      summary: string,
      fileName: string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    summary: null,
  };

  handleSummaryClick = event => {
    if (event.target.href) {
      event.stopPropagation();
    }
  };

  render() {
    const {
      classes,
      project: { name, summary, fileName },
    } = this.props;

    return (
      <NavLink className={classes.navlink} to={`/projects/${fileName}`}>
        <Card className={classes.card}>
          <CardContent className={classes.textAlign}>
            <Typography gutterBottom variant="headline" component="h4">
              {name}
            </Typography>
            {summary && (
              <Typography
                className={classes.projectSummary}
                onClick={this.handleSummaryClick}
                color="textSecondary">
                <Markdown source={summary} />
              </Typography>
            )}
          </CardContent>
        </Card>
      </NavLink>
    );
  }
}

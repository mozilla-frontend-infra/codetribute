import { Component } from 'react';
import { string, shape } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Markdown from 'react-markdown';

@withStyles(theme => ({
  card: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    minHeight: 250,
    '&:hover, &:focus': {
      transform: 'scale(1.05)',
      boxShadow: `0 1px 4px 0 ${theme.palette.primary.light}`,
    },
  },
  textAlign: {
    textAlign: 'center',
  },
  projectSummary: {
    fontWeight: 300,
    padding: 2 * theme.spacing.unit,
  },
  link: {
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

  linkRenderer = props => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

  render() {
    const {
      classes,
      project: { name, summary, fileName },
    } = this.props;

    return (
      <Link className={classes.link} to={`projects/${fileName}`}>
        <Card className={classes.card} tabIndex={0}>
          <CardContent className={classes.textAlign}>
            <Typography
              gutterBottom
              color="primary"
              variant="headline"
              component="h4">
              {name}
            </Typography>
            {summary && (
              <Typography
                className={classes.projectSummary}
                onClick={this.handleSummaryClick}
                component="object"
                color="textSecondary">
                <Markdown
                  source={summary}
                  renderers={{ link: this.linkRenderer }}
                />
              </Typography>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  }
}

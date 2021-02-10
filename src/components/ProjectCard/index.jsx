import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import { pascalCase } from 'change-case';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Markdown from 'react-markdown';

export default
@withStyles((theme) => ({
  card: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.25)',
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
    padding: theme.spacing(2),
  },
  projectIcon: {
    color: theme.palette.secondary.dark,
  },
  link: {
    textDecoration: 'none',
  },
}))
class ProjectCard extends Component {
  state = {
    projectIcon: null,
  };

  /* eslint-disable react/no-did-mount-set-state */
  async componentDidMount() {
    const { project, classes } = this.props;

    try {
      if (project.icon) {
        const mdiName = pascalCase(project.icon);
        const ProjectIcon = (
          await import(
            /* webpackChunkName: "icon" */ `mdi-react/${mdiName}Icon.js`
          )
        ).default;

        return this.setState({
          projectIcon: (
            <ProjectIcon size={50} className={classes.projectIcon} />
          ),
        });
      }

      const projectIcon = (
        await import(
          /* webpackChunkName: "icon" */ `../../images/projectIcons/${project.fileName}.svg`
        )
      ).default;

      this.setState({
        projectIcon: <img height="45" src={projectIcon} alt="Project Icon" />,
      });
    } catch (e) {
      const ProjectIcon = (
        await import(/* webpackChunkName: "icon" */ `mdi-react/WebIcon.js`)
      ).default;

      this.setState({
        projectIcon: <ProjectIcon size={50} className={classes.projectIcon} />,
      });
    }
  }
  /* eslint-enable react/no-did-mount-set-state */

  handleSummaryClick = (event) => {
    if (event.target.href) {
      event.stopPropagation();
    }
  };

  linkRenderer = (props) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

  render() {
    const {
      classes,
      project: { name, summary, fileName },
    } = this.props;
    const { projectIcon } = this.state;

    return (
      <Link className={classes.link} to={`projects/${fileName}`}>
        <Card className={classes.card} tabIndex={0}>
          <CardContent className={classes.textAlign}>
            {projectIcon}
            <Typography gutterBottom variant="h5" component="h4">
              {name}
            </Typography>
            {summary && (
              <Typography
                className={classes.projectSummary}
                onClick={this.handleSummaryClick}
                variant="body2"
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
ProjectCard.propTypes = {
  project: shape({
    name: string.isRequired,
    summary: string,
    fileName: string.isRequired,
    icon: string,
  }).isRequired,
};

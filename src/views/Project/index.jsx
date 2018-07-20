import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import Markdown from 'react-markdown';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ViewProject from './ViewProject';
import ViewMentoredTask from './ViewMentoredTask';
import projects from '../../data/loader';
import AppBar from '../../components/AppBar/index';

@hot(module)
@withStyles(theme => ({
  root: {
    background: theme.palette.background.default,
  },
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
  },
  container: {
    marginTop: 60,
    padding: 2 * theme.spacing.unit,
    minHeight: `calc(100vh - 180px - ${3 * theme.spacing.unit}px)`,
  },
  link: {
    textDecoration: 'none',
    position: 'absolute',
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  title: {
    padding: '0 41px',
  },
}))
export default class Project extends Component {
  linkRenderer = props => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

  render() {
    const {
      classes,
      match: { path },
      ...props
    } = this.props;
    const project = projects[this.props.match.params.project];

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.header}>
          <IconButton className={classes.link} component={NavLink} to="/">
            <ArrowLeftIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="display1"
            align="center"
            noWrap>
            {project.name}
          </Typography>
        </AppBar>
        <div className={classes.container}>
          {project.introduction && (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
                <Typography variant="headline">Project Introduction</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body1">
                  <Markdown
                    source={project.introduction}
                    renderers={{ link: this.linkRenderer }}
                  />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
          <Switch>
            <Route
              path={`${path}/mentored`}
              {...props}
              component={ViewMentoredTask}
            />
            <Route path={path} {...props} component={ViewProject} />
          </Switch>
        </div>
      </div>
    );
  }
}

import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';
import Dashboard from '../../components/Dashboard';
import SearchBox from '../../components/SearchBox';
import sort from '../../utils/sort';

@hot(module)
@withStyles(theme => ({
  container: {
    minHeight: `calc(100vh - 180px - ${3 * theme.spacing.unit}px)`,
    marginTop: `calc(180px + ${theme.spacing.unit}px)`,
    padding: 0,
  },
  header: {
    height: 180,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  highlightedText: {
    backgroundColor: theme.palette.common.black,
    color: 'white',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    width: '90vw',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      padding: ' 0px 12px',
      maxWidth: `calc(100vw - ${theme.drawerWidth}px)`,
    },
  },
  appBarButton: {
    position: 'absolute',
    right: 0,
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  link: {
    left: 0,
  },
  drawerHeader: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
}))
export default class Projects extends Component {
  state = {
    searchTerm: '',
  };

  handleTextInputChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  header = () => {
    const { classes } = this.props;

    return (
      <Fragment>
        <IconButton
          aria-label="Site Repository"
          className={classes.appBarButton}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mozilla-frontend-infra/codetribute"
          title="Site Repository">
          <GithubCircleIcon />
        </IconButton>
        <Typography variant="display2" align="center">
          Codetribute
        </Typography>
        <div className={classes.flexContainer}>
          <Typography
            className={classes.highlightedText}
            variant="subheading"
            align="center">
            Find your first code contribution with Mozilla
          </Typography>
        </div>
        <SearchBox
          value={this.state.searchTerm}
          onChange={this.handleTextInputChange}
        />
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    const { searchTerm } = this.state;
    const filteredProjects = Object.keys(projects)
      .filter(fileName =>
        projects[fileName].name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce(
        (prev, key) => ({
          ...prev,
          [key]: projects[key],
        }),
        {}
      );

    return (
      <Dashboard
        classes={{
          container: classes.container,
          header: classes.header,
          link: classes.link,
          drawerHeader: classes.drawerHeader,
        }}
        withSidebar
        header={this.header}>
        <Grid container spacing={24} className={classes.grid}>
          {Object.values(filteredProjects)
            .sort((a, b) => {
              const firstElement = a.name;
              const secondElement = b.name;

              return sort(firstElement, secondElement);
            })
            .map(project => (
              <Grid item key={project.fileName} xs={12} sm={12} md={4} lg={3}>
                <ProjectCard project={project} />
              </Grid>
            ))}
        </Grid>
      </Dashboard>
    );
  }
}

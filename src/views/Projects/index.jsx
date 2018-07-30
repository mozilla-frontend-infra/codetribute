import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import { Link } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';
import SearchBox from '../../components/SearchBox';
import sort from '../../utils/sort';

@hot(module)
@withStyles(theme => ({
  root: {
    overflowX: 'hidden',
  },
  container: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
    minHeight: `calc(100vh - 180px - 60px - ${1 * theme.spacing.unit}px)`,
    marginTop: `calc(180px + ${theme.spacing.unit}px)`,
  },
  header: {
    height: 180,
  },
  search: {
    marginBottom: 4 * theme.spacing.unit,
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
  },
  appBarButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    '& svg': {
      fill: '#ecffff',
    },
  },
  paper: {
    height: 60,
    background: 'white',
    padding: `${theme.spacing.unit}px 0px`,
  },
}))
export default class Projects extends Component {
  state = {
    searchTerm: '',
  };

  handleTextInputChange = event => {
    this.setState({ searchTerm: event.target.value });
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
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.header}>
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
        </AppBar>
        <main className={classes.container}>
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
        </main>
        <Paper className={classes.paper}>
          <Grid container justify="center" spacing={24} alignItems="center">
            <Hidden smDown>
              <Grid item>
                <Typography variant="display1" color="primary">
                  Feeling confused ?
                </Typography>
              </Grid>
            </Hidden>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                color="primary"
                to="/languages">
                FILTER BUG BY SKILLSET
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

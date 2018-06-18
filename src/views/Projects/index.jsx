import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';
import SearchBox from '../../components/SearchBox';

@hot(module)
@withStyles(theme => ({
  container: {
    padding: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.light,
    height: '100vh',
  },
  header: {
    paddingTop: theme.spacing.unit,
    paddingBottom: 5 * theme.spacing.unit,
    background: 'linear-gradient(45deg, #364598, #6AE5F4 90%)',
  },
  search: {
    marginBottom: 4 * theme.spacing.unit,
  },
  projects: {
    marginTop: 4 * theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit,
    color: theme.palette.primary.dark,
  },
  highlightedText: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.main,
  },
  flexContainer: {
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  '@media (min-width: 1024px)': {
    container: {
      paddingRight: 100,
      paddingLeft: 100,
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
      <Fragment>
        <header className={classes.header}>
          <Typography variant="display2" align="center" color="primary">
            Codetribute
          </Typography>
          <div className={classes.flexContainer}>
            <div className={classes.flex} />
            <Typography
              className={classes.highlightedText}
              variant="subheading"
              align="center">
              Find your first code contribution with Mozilla
            </Typography>
            <div className={classes.flex} />
          </div>
          <SearchBox
            value={this.state.searchTerm}
            onChange={this.handleTextInputChange}
          />
        </header>
        <main className={classes.container}>
          <Typography
            variant="headline"
            align="center"
            className={classes.projects}>
            Projects
          </Typography>
          <Grid container spacing={24}>
            {Object.entries(filteredProjects).map(([name, project]) => (
              <Grid item key={name} xs={12} sm={12} md={4} lg={3}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </main>
      </Fragment>
    );
  }
}

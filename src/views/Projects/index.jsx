import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';
import SearchBox from '../../components/SearchBox';

@hot(module)
@withStyles(theme => ({
  container: {
    paddingTop: 1 * theme.spacing.unit,
    backgroundColor: theme.palette.primary.light,
    minHeight: `calc(100vh - 180px - ${3 * theme.spacing.unit}px)`,
    marginTop: `calc(180px + ${theme.spacing.unit}px)`,
  },
  header: {
    paddingTop: theme.spacing.unit,
    height: 180,
    background: 'linear-gradient(45deg, #364598, #6AE5F4 90%)',
  },
  search: {
    marginBottom: 4 * theme.spacing.unit,
  },
  highlightedText: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.main,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
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
        <AppBar position="absolute" className={classes.header}>
          <Typography variant="display2" align="center" color="primary">
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

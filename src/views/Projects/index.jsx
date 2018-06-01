import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';

@hot(module)
@withStyles(theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  header: {
    paddingTop: theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
  },
  search: {
    marginBottom: 4 * theme.spacing.unit,
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
          <Typography variant="display2" align="center">
            Bug Issue
          </Typography>
          <Typography variant="subheading" align="center">
            Find your first contribution with Mozilla
          </Typography>
        </header>
        <main className={classes.container}>
          <TextField
            label="Search"
            fullWidth
            value={this.state.searchTerm}
            className={classes.search}
            onChange={this.handleTextInputChange}
          />
          <Grid container spacing={16}>
            {Object.entries(filteredProjects).map(([project, info]) => (
              <Grid item key={project} xs={12} sm={12} md={4} lg={3}>
                <ProjectCard
                  title={info.name}
                  url={`${this.props.match.url}${project}`}
                  description={info.description}
                />
              </Grid>
            ))}
          </Grid>
        </main>
      </Fragment>
    );
  }
}

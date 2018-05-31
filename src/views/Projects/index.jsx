import { Component, Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';

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
}))
export default class Projects extends Component {
  state = {
    projects,
    search: '',
  };

  handleTextInputChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { projects, search } = this.state;
    const selectedProjects = Object.keys(projects)
      .filter(fileName => {
        const found =
          fileName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          projects[fileName].name
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1;

        return found;
      })
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
            id="margin-normal"
            fullWidth
            value={this.state.search}
            className={classes.textField}
            helperText="Project name, Keyword"
            onChange={this.handleTextInputChange}
          />
          <Grid container spacing={16}>
            {Object.entries(selectedProjects).map(([project, info]) => (
              <Grid item key={project} xs={12} sm={12} md={4} lg={3}>
                <ProjectCard
                  title={info.name}
                  description={info.description}
                  url={`${this.props.match.url}${project}`}
                />
              </Grid>
            ))}
          </Grid>
        </main>
      </Fragment>
    );
  }
}

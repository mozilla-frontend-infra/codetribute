import { Component, Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';

@withStyles(
  theme => ({
    content: {
      flexGrow: 1,
      minWidth: 0,
    },
    container: {
      paddingRight: '15px',
      paddingLeft: '15px',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    header: {
      paddingTop: theme.spacing.unit,
      paddingBottom: 2 * theme.spacing.unit,
    },
  }),
  { withTheme: true }
)
export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects,
    };
  }
  render() {
    const { classes } = this.props;
    const { projects } = this.state;

    return (
      <Fragment>
        <header className={classes.header}>
          <Typography variant="display4" align="center">
            Bug Issue
          </Typography>
          <Typography variant="display1" align="center">
            Find your first contribution with Mozilla
          </Typography>
        </header>
        <main className={classes.content}>
          <div className={classes.container}>
            <Grid container spacing={16}>
              {Object.entries(projects).map(([project, info]) => (
                <Grid item key={project} xs={12} sm={12} md={4} lg={3}>
                  <ProjectCard
                    title={info.name}
                    description={info.description}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </Fragment>
    );
  }
}

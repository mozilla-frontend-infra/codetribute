import { Component, Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from 'material-ui/Typography';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';

const styles = theme => ({
  mainCard: {
    backgroundColor: theme.palette.primary.dark,
    margin: theme.spacing.unit * 3,
  },
  text: {
    color: theme.palette.secondary.light,
    margin: '1px',
  },
  grid: {
    padding: '0 15px !important',
    maxWidth: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background,
    minWidth: 0,
  },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  flex1: {
    flex: 1,
  },
  columnFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Projects extends Component {
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
        <header>
          <div className={classes.columnFlex}>
            <div className={classes.flex1} />
            <Typography variant="display4" align="center">
              Bug Issue
            </Typography>
            <Typography variant="display1" align="center">
              A first contribution finder
            </Typography>
            <div className={classes.flex1} />
          </div>
        </header>
        <main className={classes.content}>
          <div className={classes.container}>
            <Grid container spacing={16} justify="center" alignItems="center">
              {Object.entries(projects).map(([project, info]) => (
                <Grid
                  item
                  key={project}
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.grid}>
                  <ProjectCard
                    title={info.name}
                    description={info.description}
                    footer={<Button color="primary">VIEW PROJECT</Button>}
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

export default withStyles(styles, { withTheme: true })(Projects);

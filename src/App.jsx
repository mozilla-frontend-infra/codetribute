import { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { FormLabel, FormGroup, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Hidden from 'material-ui/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import data from './data.yaml';
import projectGroups from './data/loader';
import Carousel from './components/Carousel';
import './App.css';

// styles
const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 50,
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarTitle: {
    fontFamily: 'Roboto300',
  },
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    width: drawerWidth,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  formControlLabel: {
    display: 'flex',
    align: 'center',
    marginLeft: 0,
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    display: 'grid',
    minWidth: 0,
    }
});
const bugType = ['Unassigned Bug', 'Assigned Bugs', 'Simple Bugs'];

class App extends Component {
  constructor(props) {
    super(props);

    const projectSelections = {};

    Object.entries(projectGroups).forEach(projectGroup => {
      projectGroup[1].forEach(
        project => (projectSelections[project.fileName] = false)
      );
    });

    this.state = {
      mobileOpen: false,
      projectGroups,
      projectSelections: projectSelections,
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleCheckboxToggle = key => {
    const { projectSelections } = this.state;

    projectSelections[key] = !projectSelections[key];
    this.setState({ projectSelections });
  };

  render() {
    const { classes, theme } = this.props;
    const { projectGroups, projectSelections } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <FormLabel component="legend">Are you interested in:</FormLabel>

        <FormGroup>
          {Object.entries(projectGroups).map(([group, projects]) => (
            <div key={group}>
              <Typography variant="subheading">{group}</Typography>
              {projects.map(project => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={project.fileName}
                      checked={projectSelections[project.fileName]}
                      onChange={e =>
                        this.handleCheckboxToggle(project.fileName, e)
                      }
                    />
                  }
                  key={project.fileName}
                  label={project.name}
                  classes={{
                    root: classes.formControlLabel,
                  }}
                />
              ))}
            </div>
          ))}
        </FormGroup>

        <FormLabel component="legend">Do you know ?</FormLabel>
        <FormGroup>
          {data.Languages.map(lang => (
            <FormControlLabel
              control={<Checkbox value={lang} />}
              key={lang}
              label={lang}
              classes={{
                root: classes.formControlLabel,
              }}
            />
          ))}
        </FormGroup>

        <FormLabel component="legend">Filter result on:</FormLabel>
        <FormGroup>
          {bugType.map(bug => (
            <FormControlLabel
              control={<Checkbox value={bug} />}
              label={bug}
              key={bug}
              classes={{
                root: classes.formControlLabel,
              }}
            />
          ))}
        </FormGroup>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              BugsAhoy
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
              <Typography variant="subheading">Bugs</Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className={classes.grid}>
              <Carousel
                projectGroups={projectGroups}
                projectSelections={projectSelections}
              />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

import { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Hidden from 'material-ui/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import data from './data.yaml';
import projectInfo from './loader';

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
});
const bugType = ['Unassigned Bug', 'Assigned Bugs', 'Simple Bugs'];

class App extends Component {
  constructor(props) {
    super(props);
    
    const allProjectGroups = projectInfo;
    // Contains all information from allProjectGroups parsed
    const allProjectGroupsEntries = [];
    // Contains a key-value pair as [projectkey]:[checked]
    const projectSelected = {};

    // Organizes the information so that it can be displayed easily
    Object.entries(allProjectGroups).forEach(element => {
      const curr = {};
      const [key, value] = element;

      curr.group = key;
      curr.projects = Object.entries(value).reduce((projects, project) => {
        const [key, proj] = project;

        proj.key = key;
        projects.push(proj);
        projectSelected[key] = false;

        return projects;
      }, []);
      allProjectGroupsEntries.push(curr);
    });

    this.state = {
      mobileOpen: false,
      allProjectGroupsEntries,
      projectSelected,
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleCheckboxToggle = key => {
    const { projectSelected } = this.state;

    projectSelected[key] = !projectSelected[key];
    this.setState({ projectSelected });
  };

  render() {
    const { classes, theme } = this.props;
    const { allProjectGroupsEntries, projectSelected } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Are you interested in:</FormLabel>

          <FormGroup>
            {allProjectGroupsEntries.map(projectGroup => (
              <div key={projectGroup.group}>
                <Typography variant="subheading">
                  {projectGroup.group}
                </Typography>
                {projectGroup.projects.map(project => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={project.key}
                        checked={projectSelected[project.key]}
                        onChange={e =>
                          this.handleCheckboxToggle(project.key, e)
                        }
                      />
                    }
                    key={project.Name}
                    label={project.Name}
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
        </FormControl>
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

          {/* this is the place for project description, 
          i was thinking of using a auto moving carousel / modal */}
          <Typography variant="subheading">
            Projects selected description ( as a carousel later)
          </Typography>

          <Divider />
          {/* this is the place for bugs */}
          <Typography variant="subheading">Bugs (list/ table)</Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

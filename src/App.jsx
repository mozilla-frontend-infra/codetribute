import { Component } from 'react';
import './App.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//TODO: think of how the data in yaml should be structured
import data from './data.yaml';


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
    fontFamily: 'Roboto300'
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
  toolbar: theme.mixins.toolbar,
});

const bugType = ['Unassigned Bug', 'Assigned Bugs', 'Simple Bugs'];

class App extends Component {

  constructor(props) {
    super(props);
    var allProjects = [...data.Projs];
    allProjects.forEach(function(project, index) {
      project.push(false)
    })
    this.state = {
      mobileOpen: false,
      allProjects : [...data.Projs],
    };
  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleCheckboxToggle = (proj) => {
    var allProjects = [...this.state.allProjects];

    allProjects.forEach(function(project, index) {
      if (project[0] === proj) {
        console.log(project[2])
        project[2] = !project[2];
      }
    });

    this.setState({allProjects: allProjects});
  };

  render() {
    const { classes, theme } = this.props;
    const { allProjects } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you interested in:</FormLabel>
            <FormGroup>
              { allProjects.map((proj, index) => (              
                <FormControlLabel
                  control={
                    <Checkbox
                      value={proj[0]}
                      checked = {proj[2]}
                      onChange = {(e) => this.handleCheckboxToggle(proj[0],e)}
                    />
                  }
                  key={index}
                  label={proj[0]}
                />
              ))}
            </FormGroup>

            <FormLabel component="legend">Do you know ?</FormLabel>
            <FormGroup>
              { data.Languages.map((lang, index) => (              
                <FormControlLabel
                  control={
                    <Checkbox
                      value={lang}
                    />
                  }
                  key={index}
                  label={lang}
                />
              ))}
            </FormGroup>

            <FormLabel component="legend">Filter result on:</FormLabel>
            <FormGroup>
              { bugType.map((bug, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={bug}
                    />
                  }
                  label={bug}
                  key={index}
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
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>BugsAhoy</Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor= {theme.direction === 'rtl' ? 'right' : 'left'}
          open={this.state.mobileOpen}
          onClose={this.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          modalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <div className={classes.toolbar} />


          {/* this is the place for project description, i was thinking of using a auto moving carousel / modal */}
          <Typography variant="subheading">
          Projects selected description ( as a carousel later)
          </Typography>
          {allProjects.map((proj) => (
            proj[2] &&
            <Typography key={proj} noWrap>{proj} description</Typography>
            )
          )
          }

          <Divider/>
          {/* this is the place for bugs */}
          <Typography variant="subheading">
          Bugs (list/ table)
          </Typography>


        </main>
      </div>
    );

  }
}

export default withStyles(styles, { withTheme: true })(App);
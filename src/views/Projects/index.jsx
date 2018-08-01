import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from 'mdi-react/CloseIcon';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import classNames from 'classnames';
import AppBar from '../../components/AppBar';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';
import SearchBox from '../../components/SearchBox';
import Sidebar from '../../components/Sidebar';
import sort from '../../utils/sort';

@hot(module)
@withStyles(theme => ({
  root: {
    overflowX: 'hidden',
    display: 'flex',
  },
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
    minHeight: `calc(100vh - 180px - ${3 * theme.spacing.unit}px)`,
    marginTop: `calc(180px + ${theme.spacing.unit}px)`,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
    overflowX: 'auto',
  },
  header: {
    height: 180,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
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
    [theme.breakpoints.up('md')]: {
      padding: ' 0px 12px',
      maxWidth: `calc(100vw - ${theme.drawerWidth}px)`,
    },
  },
  appBarButton: {
    position: 'absolute',
    '& svg': {
      fill: '#ecffff',
    },
  },
  rightButton: {
    right: theme.spacing.unit,
  },
  leftButton: {
    left: theme.spacing.unit,
  },
  drawerHeader: {
    ...theme.mixins.gutters(),
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerPaper: {
    width: theme.drawerWidth,
    maxWidth: '100%',
  },
}))
export default class Projects extends Component {
  state = {
    searchTerm: '',
    drawerOpen: false,
  };

  handleTextInputChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { classes } = this.props;
    const { searchTerm, drawerOpen } = this.state;
    const drawer = (
      <Fragment>
        <div className={classes.drawerHeader}>
          <Typography variant="title">Skills</Typography>
          <Hidden mdUp>
            <IconButton onClick={this.handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Hidden>
        </div>
        <Divider light />
        <Sidebar onItemClick={this.handleDrawerToggle} />
      </Fragment>
    );
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
            className={classNames(classes.appBarButton, classes.rightButton)}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mozilla-frontend-infra/codetribute"
            title="Site Repository">
            <GithubCircleIcon />
          </IconButton>
          <Hidden mdUp>
            <IconButton
              aria-label="Language"
              className={classNames(classes.appBarButton, classes.leftButton)}
              onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Hidden>
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
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={drawerOpen}
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
            PaperProps={{
              elevation: 2,
            }}
            classes={{
              paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
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
      </div>
    );
  }
}

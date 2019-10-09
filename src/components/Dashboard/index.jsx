import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { bool, node, string, object } from 'prop-types';
import AppBar from '../AppBar';
import Sidebar from '../Sidebar';

@withStyles(theme => ({
  root: {
    background: theme.palette.background.default,
  },
  rootWithSidebar: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    width: theme.drawerWidth,
    maxWidth: '100%',
    background: theme.palette.grey[100],
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
    zIndex: theme.zIndex.drawer + 1,
  },
  headerWithSidebar: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  drawerHeader: {
    ...theme.mixins.gutters(),
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  title: {
    color: 'white',
  },
  link: {
    textDecoration: 'none',
    position: 'absolute',
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  menuIconButton: {
    position: 'absolute',
    right: theme.spacing.unit,
  },
  container: {
    marginTop: 60,
    padding: 2 * theme.spacing.unit,
  },
  containerWithSidebar: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
}))
export default class Dashboard extends Component {
  static propTypes = {
    /*
     * The title to be put in the AppBar
     */
    title: string,
    /*
     * Boolean to render the sidebar
     */
    withSidebar: bool,
    /*
     * The custom header to be put in the AppBar
     */
    header: node,
    /*
     * The style to be used by the Component
     */
    classes: object,
  };

  static defaultProps = {
    classes: null,
    withSidebar: false,
    title: null,
    header: null,
  };

  state = {
    drawerOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { drawerOpen } = this.state;
    const { classes, children, withSidebar, title, header } = this.props;
    const drawer = (
      <Fragment>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" color="inherit">
            Skills
          </Typography>
          <Hidden mdUp>
            <IconButton onClick={this.handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Hidden>
        </div>
        <Divider light />
        <Sidebar onLanguageClick={this.handleDrawerToggle} />
      </Fragment>
    );

    return (
      <div
        className={classNames(classes.root, {
          [classes.rootWithSidebar]: withSidebar,
        })}>
        <AppBar
          position={header ? 'absolute' : 'fixed'}
          className={classNames(classes.header, {
            [classes.headerWithSidebar]: withSidebar,
          })}>
          {header || (
            <Fragment>
              <IconButton className={classes.link} component={Link} to="/">
                <ArrowLeftIcon />
              </IconButton>
              <Typography
                align="center"
                variant="h4"
                className={classes.title}
                noWrap>
                {title}
              </Typography>
            </Fragment>
          )}
          {withSidebar && (
            <Hidden mdUp>
              <IconButton
                className={classNames(classes.link, {
                  [classes.menuIconButton]: !header,
                })}
                size="large"
                onClick={this.handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          )}
        </AppBar>
        {withSidebar && (
          <Fragment>
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
          </Fragment>
        )}
        <main
          className={classNames(classes.container, {
            [classes.containerWithSidebar]: withSidebar,
          })}>
          {children}
        </main>
      </div>
    );
  }
}

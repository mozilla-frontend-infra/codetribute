import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import LanguagePythonIcon from 'mdi-react/LanguagePythonIcon';
import LanguageCppIcon from 'mdi-react/LanguageCppIcon';
import LanguageCIcon from 'mdi-react/LanguageCIcon';
import LanguageJavascriptIcon from 'mdi-react/LanguageJavascriptIcon';
import LanguageCsharpIcon from 'mdi-react/LanguageCsharpIcon';
import LanguageCss3Icon from 'mdi-react/LanguageCss3Icon';
import LanguageSwiftIcon from 'mdi-react/LanguageSwiftIcon';
import AppBar from '../../components/AppBar';
import TasksTable from '../../components/TasksTable';
import Sidebar from '../../components/Sidebar';

@hot(module)
@withStyles(theme => ({
  drawerPaper: {
    color: theme.palette.secondary.contrastText,
    width: 300,
    maxWidth: '100%',
  },
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
  },
  drawerHeader: {
    ...theme.mixins.gutters(),
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  container: {
    marginTop: 60,
    // padding: 2 * theme.spacing.unit,
  },
  title: {
    ...theme.mixins.gutters(),
  },
  button: {
    color: theme.palette.common.white,
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
}))
export default class Languages extends Component {
  state = {
    drawerOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const {
      classes,
      match: {
        params: { language },
      },
    } = this.props;
    const { drawerOpen } = this.state;
    const icons = {
      Python: <LanguagePythonIcon />,
      Javascript: <LanguageJavascriptIcon />,
      Swift: <LanguageSwiftIcon />,
      C: <LanguageCIcon />,
      'C++': <LanguageCppIcon />,
      'C#': <LanguageCsharpIcon />,
      CSS3: <LanguageCss3Icon />,
    };
    const items = Object.entries(icons).map(([text, icon]) => ({ text, icon }));
    const drawer = (
      <Fragment>
        <div className={classes.drawerHeader}>
          <Typography variant="title">Skills</Typography>
          <IconButton onClick={this.handleDrawerToggle}>
            <ArrowRightIcon />
          </IconButton>
        </div>
        <Divider light />
        <Sidebar
          activeItem={language}
          items={items}
          onItemClick={this.handleDrawerToggle}
        />
      </Fragment>
    );

    return (
      <Fragment>
        <AppBar position="absolute" className={classes.header}>
          <Grid
            container
            className={classes.title}
            alignItems="center"
            justify="space-between"
            spacing={8}>
            <Grid item>
              <Typography
                align="center"
                variant="display1"
                noWrap
                className={classes.link}
                component={Link}
                to="/">
                Codetribute
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                size="large"
                onClick={this.handleDrawerToggle}>
                Skills
              </Button>
            </Grid>
          </Grid>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="right"
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
        <div className={classes.container}>
          <TasksTable items={[]} />
        </div>
      </Fragment>
    );
  }
}

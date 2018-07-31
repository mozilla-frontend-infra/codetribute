import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from 'mdi-react/MenuIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import { memoizeWith } from 'ramda';
import uniqBy from 'lodash.uniqby';
import AppBar from '../../components/AppBar';
import TasksTable from '../../components/TasksTable';
import Sidebar from '../../components/Sidebar';
import ErrorPanel from '../../components/ErrorPanel';
import Spinner from '../../components/Spinner';
import bugsQuery from './bugs.graphql';
import commentsQuery from './comments.graphql';
import {
  BUGZILLA_ORDER,
  BUGZILLA_PAGE_NUMBER,
  BUGZILLA_PAGE_SIZE,
  BUGZILLA_STATUSES,
  GOOD_FIRST_BUG,
  BUGZILLA_LANGUAGE_MAPPING,
} from '../../utils/constants';
import extractWhiteboardTags from '../../utils/extractWhiteboardTags';

const DRAWER_WIDTH = 300;
const bugzillaSearchOptions = {
  keywords: [GOOD_FIRST_BUG],
  statuses: Object.values(BUGZILLA_STATUSES),
  order: BUGZILLA_ORDER,
};
const bugzillaPagingOptions = {
  page: BUGZILLA_PAGE_NUMBER,
  pageSize: BUGZILLA_PAGE_SIZE,
};

@withApollo
@hot(module)
@graphql(bugsQuery, {
  skip: ({
    match: {
      params: { language },
    },
  }) => !language || !BUGZILLA_LANGUAGE_MAPPING[language],
  name: 'bugzilla',
  options: ({
    match: {
      params: { language },
    },
  }) => ({
    fetchPolicy: 'network-only',
    variables: {
      search: {
        ...bugzillaSearchOptions,
        whiteboards: `lang=${BUGZILLA_LANGUAGE_MAPPING[language]}`,
      },
      paging: {
        ...bugzillaPagingOptions,
      },
    },
    context: {
      client: 'bugzilla',
    },
  }),
})
@withStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100vw',
  },
  drawerPaper: {
    color: theme.palette.secondary.contrastText,
    width: DRAWER_WIDTH,
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
    zIndex: theme.zIndex.drawer + 1,
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
  },
  container: {
    overflow: 'auto',
    flexGrow: 1,
    marginTop: 60,
    padding: 2 * theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    },
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
    error: null,
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleBugInfoClick = memoizeWith(
    id => id,
    async id => {
      try {
        const {
          data: { comments },
        } = await this.props.client.query({
          query: commentsQuery,
          variables: { id },
          context: { client: 'bugzilla' },
        });

        return comments[0].text;
      } catch (error) {
        this.setState({ error });
      }
    }
  );

  render() {
    const {
      classes,
      match: {
        params: { language },
      },
    } = this.props;
    const { drawerOpen, error } = this.state;
    const drawer = (
      <Fragment>
        <div className={classes.drawerHeader}>
          <Typography variant="title">Skills</Typography>
          <IconButton onClick={this.handleDrawerToggle}>
            <ArrowRightIcon />
          </IconButton>
        </div>
        <Divider light />
        <Sidebar activeItem={language} onItemClick={this.handleDrawerToggle} />
      </Fragment>
    );
    const bugzillaData = this.props.bugzilla;
    const bugs =
      (bugzillaData &&
        bugzillaData.bugs &&
        uniqBy(
          bugzillaData.bugs.edges.map(edge => edge.node).map(bug => ({
            assignee: bug.status === 'ASSIGNED' ? bug.assignedTo.name : '-',
            project: bug.component,
            tags: [
              ...(bug.keywords || []),
              ...extractWhiteboardTags(bug.whiteboard),
            ],
            summary: bug.summary,
            lastUpdated: bug.lastChanged,
            id: bug.id,
            url: `https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}`,
          })),
          'summary'
        )) ||
      [];

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.header}>
          <Grid
            container
            className={classes.title}
            alignItems="center"
            spacing={8}>
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  className={classes.button}
                  size="large"
                  onClick={this.handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
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
          </Grid>
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
        <div className={classes.container}>
          {error && <ErrorPanel error={error} />}
          {bugzillaData &&
            bugzillaData.error && <ErrorPanel error={bugzillaData.error} />}
          {bugzillaData &&
            bugzillaData.loading && <Spinner className={classes.spinner} />}
          <TasksTable items={bugs} onBugInfoClick={this.handleBugInfoClick} />
        </div>
      </div>
    );
  }
}

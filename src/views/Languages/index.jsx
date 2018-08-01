import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { memoizeWith, mergeAll } from 'ramda';
import uniqBy from 'lodash.uniqby';
import dotProp from 'dot-prop-immutable';
import AppBar from '../../components/AppBar';
import TasksTable from '../../components/TasksTable';
import Sidebar from '../../components/Sidebar';
import ErrorPanel from '../../components/ErrorPanel';
import Spinner from '../../components/Spinner';
import bugsQuery from '../bugs.graphql';
import commentsQuery from '../comments.graphql';
import issuesQuery from './issues.graphql';
import {
  BUGZILLA_ORDER,
  BUGZILLA_PAGE_NUMBER,
  BUGZILLA_PAGE_SIZE,
  BUGZILLA_STATUSES,
  GOOD_FIRST_BUG,
  BUGZILLA_LANGUAGES,
  GITHUB_LANGUAGE_QUERY_ORDER,
} from '../../utils/constants';
import extractWhiteboardTags from '../../utils/extractWhiteboardTags';
import projects from '../../data/loader';

const repos = mergeAll(
  Object.values(projects)
    .filter(project => project.repositories)
    .map(project => project.repositories)
    .reduce((prev, curr) => [...prev, ...curr], [])
);
const tagReposMapping = repositories =>
  Object.keys(repositories).reduce((previousMappings, repoName) => {
    const tags = repositories[repoName];
    const labels = typeof tags === 'string' ? [tags] : tags;
    const mappings = labels.reduce(
      (labels, label) => ({
        ...labels,
        [label]: [...(previousMappings[label] || []), repoName],
      }),
      {}
    );

    return {
      ...previousMappings,
      ...mappings,
    };
  }, {});
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
@compose(
  graphql(issuesQuery, {
    name: 'github',
    options: ({
      match: {
        params: { language },
      },
    }) => ({
      fetchPolicy: 'network-only',
      variables: {
        searchQuery: [
          `language:${language}`,
          ...Object.keys(repos).map(repo => `repo:${repo}`),
        ].join(' '),
        order: GITHUB_LANGUAGE_QUERY_ORDER,
        type: 'REPOSITORY',
      },
      context: {
        client: 'github',
      },
    }),
  }),
  graphql(bugsQuery, {
    skip: ({
      match: {
        params: { language },
      },
    }) => !BUGZILLA_LANGUAGES[language],
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
          whiteboards: `lang=${BUGZILLA_LANGUAGES[language]}`,
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
)
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
    width: theme.drawerWidth,
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: 60,
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
      marginLeft: theme.drawerWidth,
      width: `calc(100% - ${theme.drawerWidth}px)`,
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

  componentDidUpdate(prevProps) {
    if (
      (prevProps.bugzilla &&
        prevProps.bugzilla.loading &&
        !this.props.bugzilla.loading) ||
      (!prevProps.bugzilla &&
        prevProps.github.loading &&
        !this.props.github.loading)
    ) {
      this.loadGithub();
    }
  }

  fetchGithub = searchQuery => {
    const {
      github: { fetchMore },
    } = this.props;

    return fetchMore({
      query: issuesQuery,
      variables: {
        searchQuery,
        type: 'ISSUE',
      },
      context: {
        client: 'github',
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const moreNodes = fetchMoreResult.search.nodes;

        if (!moreNodes.length) {
          return previousResult;
        }

        return dotProp.set(
          previousResult,
          'search.nodes',
          moreNodes.concat(previousResult.search.nodes)
        );
      },
    });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  loadGithub = async () => {
    const {
      github: githubData,
      match: {
        params: { language },
      },
    } = this.props;

    if (!language) {
      return;
    }

    const githubLanguages =
      (githubData &&
        githubData.search &&
        githubData.search.nodes
          .filter(repository => repository.languages)
          .reduce(
            (repositories, repository) => [
              ...repositories,
              repository.nameWithOwner,
            ],
            []
          )) ||
      [];
    const filteredRepos = Object.entries(repos)
      .filter(([repo]) => githubLanguages.includes(repo))
      .reduce(
        (repositories, [repository, tag]) => ({
          ...repositories,
          [repository]: tag,
        }),
        {}
      );
    const tagsMapping = tagReposMapping(filteredRepos) || {};

    await Promise.all(
      Object.entries(tagsMapping).map(([tag, repos]) => {
        const searchQuery = [
          repos.map(repo => `repo:${repo}`).join(' '),
          `label:"${tag}"`,
          'state:open',
        ].join(' ');

        return this.fetchGithub(searchQuery);
      })
    );
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
      bugzilla: bugzillaData,
      github: githubData,
    } = this.props;
    const { drawerOpen, error } = this.state;
    const loading =
      (bugzillaData && bugzillaData.loading) ||
      (githubData && githubData.loading);
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
        <Sidebar activeItem={language} onItemClick={this.handleDrawerToggle} />
      </Fragment>
    );
    const issues =
      (githubData &&
        githubData.search &&
        uniqBy(
          githubData.search.nodes.filter(issue => issue.title).map(issue => ({
            project: issue.repository.name,
            summary: issue.title,
            tags: issue.labels.nodes.map(node => node.name).sort(),
            lastUpdated: issue.updatedAt,
            assignee: issue.assignees.nodes[0]
              ? issue.assignees.nodes[0].login
              : '-',
            url: issue.url,
            description: issue.body,
          })),
          'summary'
        )) ||
      [];
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
          {githubData &&
            githubData.error && <ErrorPanel error={githubData.error} />}
          {bugzillaData &&
            bugzillaData.error && <ErrorPanel error={bugzillaData.error} />}
          {loading && <Spinner className={classes.spinner} />}
          {!loading && (
            <TasksTable
              items={[...issues, ...bugs]}
              onBugInfoClick={this.handleBugInfoClick}
            />
          )}
        </div>
      </div>
    );
  }
}

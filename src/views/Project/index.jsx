import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import dotProp from 'dot-prop-immutable';
import { mergeAll } from 'ramda';
import uniqBy from 'lodash.uniqby';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Markdown from 'react-markdown';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
import AppBar from '../../components/AppBar';
import ErrorPanel from '../../components/ErrorPanel';
import TasksTable from '../../components/TasksTable';
import issuesQuery from './issues.graphql';
import bugsQuery from './bugs.graphql';

const tagReposMapping = repositories =>
  Object.keys(repositories).reduce((prev, key) => {
    const curr = [...(prev[repositories[key]] || []), key];

    return {
      ...prev,
      [repositories[key]]: curr,
    };
  }, {});

@hot(module)
@compose(
  graphql(issuesQuery, {
    skip: props => !projects[props.match.params.project].repositories,
    name: 'github',
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {
        searchQuery: '',
      },
      context: {
        client: 'github',
      },
    }),
  }),
  graphql(bugsQuery, {
    skip: props => !projects[props.match.params.project].products,
    name: 'bugzilla',
    options: props => ({
      variables: {
        search: {
          products:
            projects[props.match.params.project].products.filter(
              product => typeof product === 'string'
            ).length > 0
              ? projects[props.match.params.project].products.filter(
                  product => typeof product === 'string'
                )
              : Object.keys(
                  projects[props.match.params.project].products[0]
                )[0],
          components:
            projects[props.match.params.project].products.filter(
              product => typeof product === 'string'
            ).length > 0
              ? undefined
              : Object.values(
                  projects[props.match.params.project].products[0]
                )[0],
          statuses: ['NEW', 'UNCONFIRMED', 'ASSIGNED', 'REOPENED'],
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
    background: theme.palette.background.default,
  },
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
  },
  container: {
    marginTop: 60,
    padding: 2 * theme.spacing.unit,
    minHeight: `calc(100vh - 180px - ${3 * theme.spacing.unit}px)`,
  },
  link: {
    textDecoration: 'none',
    position: 'absolute',
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  title: {
    padding: '0 41px',
  },
}))
export default class Project extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.load();
  }

  fetchBugzilla = variable => {
    const {
      bugzilla: { fetchMore },
    } = this.props;

    return fetchMore({
      query: bugsQuery,
      variables: variable,
      context: {
        client: 'bugzilla',
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const moreNodes = fetchMoreResult.bugs.edges;

        if (!moreNodes.length) {
          return previousResult;
        }

        if (!previousResult.bugs) {
          return fetchMoreResult;
        }

        return dotProp.set(
          previousResult,
          'bugs.edges',
          moreNodes.concat(previousResult.bugs.edges)
        );
      },
    });
  };

  fetchGithub = searchQuery => {
    const {
      github: { fetchMore },
    } = this.props;

    return fetchMore({
      query: issuesQuery,
      variables: {
        searchQuery,
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

  load = async () => {
    const project = projects[this.props.match.params.project];
    const repositories = mergeAll(project.repositories);
    const tagsMapping = tagReposMapping(repositories);

    await Promise.all(
      Object.entries(tagsMapping).map(([tag, repos]) => {
        const searchQuery = [
          repos.map(repo => `repo:${repo}`).join(' '),
          `label:${tag}`,
          'state:open',
        ].join(' ');

        return this.fetchGithub(searchQuery);
      })
    );
    const variable = {
      search: {
        tags: ['good-first-bug'],
        statuses: ['NEW', 'UNCONFIRMED', 'ASSIGNED', 'REOPENED'],
      },
      paging: {
        page: 0,
        pageSize: 100,
      },
    };
    const productWithComponentList = mergeAll(
      project.products.filter(product => typeof product !== 'string') || []
    );

    await Promise.all(
      Object.entries(productWithComponentList).map(([products, components]) => {
        variable.search.products = [products];
        variable.search.components = components;

        return this.fetchBugzilla(variable);
      })
    );

    this.setState({ loading: false });
  };

  render() {
    const { classes } = this.props;
    const githubData = this.props.github;
    const { loading } = this.state;
    const project = projects[this.props.match.params.project];
    const issues =
      (githubData &&
        githubData.search &&
        uniqBy(
          githubData.search.nodes.map(issue => ({
            project: issue.repository.name,
            id: issue.number,
            summary: `${issue.number} - ${issue.title}`,
            tags: issue.labels.nodes.map(node => node.name).sort(),
            lastUpdated: issue.updatedAt,
            assignee: issue.assignees.nodes[0]
              ? issue.assignees.nodes[0].login
              : '-',
            url: issue.url,
          })),
          'summary'
        )) ||
      [];
    const bugzillaData = this.props.bugzilla;
    const bugs =
      (bugzillaData &&
        bugzillaData.bugs &&
        uniqBy(
          bugzillaData.bugs.edges.map(edge => edge.node).map(bug => ({
            assignee: bug.status === 'ASSIGNED' ? bug.assignedTo.name : '-',
            project: bug.component,
            tags: bug.keywords.join(',') || '',
            summary: `${bug.id} - ${bug.summary}`,
            lastUpdated: bug.lastChanged,
            url: `https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}`,
          })),
          'summary'
        )) ||
      [];

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.header}>
          <IconButton className={classes.link} component={NavLink} to="/">
            <ArrowLeftIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="display1"
            align="center"
            noWrap>
            {project.name}
          </Typography>
        </AppBar>
        <div className={classes.container}>
          {project.introduction && (
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>
                <Typography variant="headline">Project Introduction</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body1">
                  <Markdown source={project.introduction} />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
          {githubData &&
            githubData.error && <ErrorPanel error={githubData.error} />}
          {bugzillaData &&
            bugzillaData.error && <ErrorPanel error={bugzillaData.error} />}
          {loading && <Spinner />}
          {!loading && <TasksTable items={[...issues, ...bugs]}
        </div>
      </div>
    );
  }
}

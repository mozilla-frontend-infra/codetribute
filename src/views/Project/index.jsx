import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { graphql } from 'react-apollo';
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

const tagReposMapping = repositories =>
  Object.keys(repositories).reduce((prev, key) => {
    const curr = [...(prev[repositories[key]] || []), key];

    return {
      ...prev,
      [repositories[key]]: curr,
    };
  }, {});

@hot(module)
@graphql(issuesQuery, {
  skip: props => !projects[props.match.params.project].repositories,
  options: () => ({
    fetchPolicy: 'network-only',
    variables: {
      searchQuery: '',
    },
  }),
})
@withStyles(theme => ({
  root: {
    background: theme.palette.background,
  },
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
  },
  container: {
    marginTop: 60,
    paddingTop: theme.spacing.unit,
    minHeight: `calc(100vh - 180px - ${3 * theme.spacing.unit}px)`,
  },
  link: {
    textDecoration: 'none',
    position: 'absolute',
    alignItems: 'center',
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  title: {
    marginLeft: 41,
  },
}))
export default class Project extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.load();
  }

  fetch = searchQuery => {
    const {
      data: { fetchMore },
    } = this.props;

    return fetchMore({
      query: issuesQuery,
      variables: {
        searchQuery,
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

        return this.fetch(searchQuery);
      })
    );

    this.setState({ loading: false });
  };

  render() {
    const { data, classes } = this.props;
    const { loading } = this.state;
    const project = projects[this.props.match.params.project];
    const issues =
      (data &&
        data.search &&
        uniqBy(
          data.search.nodes.map(issue => ({
            project: issue.repository.name,
            id: issue.number,
            summary: `${issue.number} - ${issue.title}`,
            tag: issue.labels.nodes.map(node => node.name),
            lastUpdated: issue.updatedAt,
            assignee: issue.assignees.nodes[0]
              ? issue.assignees.nodes[0].login
              : '-',
            url: issue.url,
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
                <Typography variant="display1">Project Introduction</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body1">
                  <Markdown source={project.introduction} />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
          {data && data.error && <ErrorPanel error={data.error} />}
          {loading && <Spinner />}
          {!loading && <TasksTable items={issues} />}
        </div>
      </div>
    );
  }
}

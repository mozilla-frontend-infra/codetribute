import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import dotProp from 'dot-prop-immutable';
import { mergeAll, memoizeWith } from 'ramda';
import uniqBy from 'lodash.uniqby';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, CardActions } from '@material-ui/core';
import Markdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
import ErrorPanel from '../../components/ErrorPanel';
import TasksTable from '../../components/TasksTable';
import githubInfoQuery from '../githubInfo.graphql';
import bugsQuery from '../bugs.graphql';
import commentsQuery from '../comments.graphql';
import {
  GOOD_FIRST_BUG,
  MENTORED_BUG,
  BUGZILLA_PAGING_OPTIONS,
  BUGZILLA_SEARCH_OPTIONS,
  BUGZILLA_UNASSIGNED,
} from '../../utils/constants';
import extractWhiteboardTags from '../../utils/extractWhiteboardTags';
import Dashboard from '../../components/Dashboard';

const productsWithNoComponents = products =>
  products.filter(product => typeof product === 'string');
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

@hot(module)
@compose(
  graphql(githubInfoQuery, {
    skip: ({
      match: {
        params: { project },
      },
    }) => !projects[project].repositories,
    name: 'github',
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {
        searchQuery: '',
        type: 'ISSUE',
      },
      context: {
        client: 'github',
      },
    }),
  }),
  graphql(bugsQuery, {
    skip: ({
      match: {
        params: { project },
      },
    }) => !projects[project].products,
    name: 'bugzilla',
    options: ({
      match: {
        params: { project },
      },
    }) => ({
      fetchPolicy: 'network-only',
      variables: {
        goodFirst: {
          ...BUGZILLA_SEARCH_OPTIONS,
          keywords: [GOOD_FIRST_BUG],
          // get all the product with no component as it can be
          // merged as an OR query if it exists
          ...(productsWithNoComponents(projects[project].products).length
            ? { products: productsWithNoComponents(projects[project].products) }
            : {
                // otherwise, get only the first product and its components
                // as component is not unique for product thus can't be merged
                products: Object.keys(projects[project].products[0])[0],
                components: Object.values(projects[project].products[0])[0],
              }),
        },
        mentored: {
          ...BUGZILLA_SEARCH_OPTIONS,
          ...MENTORED_BUG,
          // get all the product with no component as it can be
          // merged as an OR query if it exists
          ...(productsWithNoComponents(projects[project].products).length
            ? { products: productsWithNoComponents(projects[project].products) }
            : {
                // otherwise, get only the first product and its components
                // as component is not unique for product thus can't be merged
                products: Object.keys(projects[project].products[0])[0],
                components: Object.values(projects[project].products[0])[0],
              }),
        },
        paging: {
          ...BUGZILLA_PAGING_OPTIONS,
        },
      },
      context: {
        client: 'bugzilla',
      },
    }),
  })
)
@withApollo
@withStyles(theme => ({
  spinner: {
    marginTop: 3 * theme.spacing.unit,
  },
}))
export default class Project extends Component {
  state = {
    loading: true,
    error: null,
    introductionOpen: false,
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
      this.load();
    }
  }

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

  fetchBugzilla = (products, components) => {
    const {
      bugzilla: { fetchMore },
    } = this.props;

    return fetchMore({
      query: bugsQuery,
      variables: {
        goodFirst: {
          keywords: [GOOD_FIRST_BUG],
          ...BUGZILLA_SEARCH_OPTIONS,
          products,
          components,
        },
        mentored: {
          ...MENTORED_BUG,
          ...BUGZILLA_SEARCH_OPTIONS,
          products,
          components,
        },
        paging: {
          ...BUGZILLA_PAGING_OPTIONS,
        },
      },
      context: {
        client: 'bugzilla',
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const moreGoodFirstNodes = fetchMoreResult.goodFirst.edges;
        const moreMentoredNodes = fetchMoreResult.mentored.edges;

        // return previousResult;
        if (!moreGoodFirstNodes.length && !moreMentoredNodes) {
          return previousResult;
        }

        return dotProp.set(
          dotProp.set(
            previousResult,
            'goodFirst.edges',
            moreGoodFirstNodes.concat(previousResult.goodFirst.edges)
          ),
          'mentored.edges',
          moreMentoredNodes.concat(previousResult.mentored.edges)
        );
      },
    });
  };

  fetchGithub = searchQuery => {
    const {
      github: { fetchMore },
    } = this.props;

    return fetchMore({
      query: githubInfoQuery,
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

  load = async () => {
    const project = projects[this.props.match.params.project];
    const repositories = mergeAll(project.repositories);
    const tagsMapping = tagReposMapping(repositories);

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
    const productWithComponentList = mergeAll(
      project.products
        ? project.products.filter(product => typeof product !== 'string')
        : []
    );

    // fetch only the product with component list, since product without
    // component would have been fetched by the initial graphql decorator query
    await Promise.all(
      Object.entries(productWithComponentList).map(([products, components]) =>
        this.fetchBugzilla([products], components)
      )
    );

    this.setState({ loading: false });
  };

  linkRenderer = props => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

  handleButtonClick = () => {
    this.setState({
      introductionOpen: !this.state.introductionOpen,
    });
  };

  render() {
    const { classes } = this.props;
    const githubData = this.props.github;
    const { loading, error } = this.state;
    const project = projects[this.props.match.params.project];
    const issues =
      (githubData &&
        githubData.search &&
        uniqBy(
          githubData.search.nodes.map(issue => ({
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
    const bugzillaData = this.props.bugzilla;
    const goodFirstBugs =
      (bugzillaData &&
        bugzillaData.goodFirst &&
        uniqBy(
          bugzillaData.goodFirst.edges.map(edge => edge.node).map(bug => ({
            assignee: BUGZILLA_UNASSIGNED.some(email =>
              bug.assignedTo.name.endsWith(email)
            )
              ? '-'
              : bug.assignedTo.name,
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
    const mentoredBugs =
      (bugzillaData &&
        bugzillaData.mentored &&
        uniqBy(
          bugzillaData.mentored.edges.map(edge => edge.node).map(bug => ({
            assignee: BUGZILLA_UNASSIGNED.some(email =>
              bug.assignedTo.name.endsWith(email)
            )
              ? '-'
              : bug.assignedTo.name,
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
    const items = uniqBy(
      [...issues, ...goodFirstBugs, ...mentoredBugs],
      'summary'
    );
    const { introductionOpen } = this.state;

    return (
      <Dashboard title={project.name}>
        {project.introduction && (
          <Card>
            <CardContent>
              <Typography>
                <Markdown
                  source={
                    introductionOpen
                      ? project.introduction
                      : project.introduction.split(/(?=##\s)/)[0]
                  }
                  renderers={{ link: this.linkRenderer }}
                />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={this.handleButtonClick}
                className={classes.seeMoreButton}
              >
                {introductionOpen ? 'See Less' : 'See More'}
              </Button>
            </CardActions>
          </Card>
        )}
        {githubData &&
          githubData.error && <ErrorPanel error={githubData.error} />}
        {bugzillaData &&
          bugzillaData.error && <ErrorPanel error={bugzillaData.error} />}
        {error && <ErrorPanel error={error} />}
        {loading && <Spinner className={classes.spinner} />}
        {!loading && (
          <TasksTable onBugInfoClick={this.handleBugInfoClick} items={items} />
        )}
      </Dashboard>
    );
  }
}

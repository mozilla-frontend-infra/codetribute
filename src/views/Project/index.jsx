import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import dotProp from 'dot-prop-immutable';
import { mergeAll, memoizeWith } from 'ramda';
import uniqBy from 'lodash.uniqby';
import { withStyles } from '@material-ui/core/styles';
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
  BUGZILLA_PAGE_SIZE,
  BUGZILLA_PAGING_OPTIONS,
  BUGZILLA_SEARCH_OPTIONS,
  BUGZILLA_UNASSIGNED,
} from '../../utils/constants';
import extractWhiteboardTags from '../../utils/extractWhiteboardTags';
import Dashboard from '../../components/Dashboard';
import ProjectIntroductionCard from '../../components/ProjectIntroductionCard';

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
const pagingGithub = {};
const pagingGood = {};
const pagingMen = {};

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
        after: null,
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
        pagingGood: {
          ...BUGZILLA_PAGING_OPTIONS,
        },
        pagingMen: {
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
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
  };

  loadNextPage = async () => {
    await this.setState({ isNextPageLoading: true });
    await this.load();
    const githubData = this.props.github;
    const bugzillaData = this.props.bugzilla;
    let issues = [];
    let hasNextPage = false;
    let goodFirstBugs = [];
    let mentoredBugs = [];

    if (githubData && githubData.search) {
      issues = uniqBy(
        githubData.search.nodes.map(issue => ({
          project: issue.repository.name,
          summary: {
            title: issue.title,
            url: issue.url,
          },
          tags: issue.labels.nodes.map(node => node.name).sort(),
          lastUpdated: issue.updatedAt,
          assignee: issue.assignees.nodes[0]
            ? issue.assignees.nodes[0].login
            : '-',
          description: issue.body,
        })),
        'summary.title'
      );

      Object.keys(pagingGithub).forEach(x => {
        if (pagingGithub[x].hasNextPage) {
          hasNextPage = true;
        }
      });
    }

    if (bugzillaData) {
      if (bugzillaData.goodFirst) {
        goodFirstBugs = uniqBy(
          bugzillaData.goodFirst.edges
            .map(edge => edge.node)
            .map(bug => ({
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
              summary: {
                title: bug.summary,
                url: `https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}`,
              },
              lastUpdated: bug.lastChanged,
              id: bug.id,
            })),
          'summary.title'
        );

        if (!hasNextPage) {
          Object.keys(pagingGood).forEach(x => {
            if (pagingGood[x].hasNextPage) {
              hasNextPage = true;
            }
          });
        }
      }

      if (bugzillaData.mentored) {
        mentoredBugs = uniqBy(
          bugzillaData.mentored.edges
            .map(edge => edge.node)
            .map(bug => ({
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
              summary: {
                title: bug.summary,
                url: `https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}`,
              },
              lastUpdated: bug.lastChanged,
              id: bug.id,
            })),
          'summary.title'
        );

        if (hasNextPage !== true)
          Object.keys(pagingMen).forEach(x => {
            if (pagingMen[x].hasNextPage) {
              hasNextPage = true;
            }
          });
      }
    }

    await this.setState({
      hasNextPage,
      isNextPageLoading: false,
      items: uniqBy(
        [...issues, ...goodFirstBugs, ...mentoredBugs],
        'summary.title'
      ),
    });
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
      this.loadNextPage();
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
    const pageGood =
      JSON.stringify({ products, components }) in pagingGood
        ? pagingGood[JSON.stringify({ products, components })].nextPage
        : 0;
    const pageMen =
      JSON.stringify({ products, components }) in pagingMen
        ? pagingMen[JSON.stringify({ products, components })].nextPage
        : 0;

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
        pagingGood: {
          page: pageGood,
          pageSize: BUGZILLA_PAGE_SIZE,
        },
        pagingMen: {
          page: pageMen,
          pageSize: BUGZILLA_PAGE_SIZE,
        },
      },
      context: {
        client: 'bugzilla',
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const moreGoodFirstNodes = fetchMoreResult.goodFirst.edges;
        const moreMentoredNodes = fetchMoreResult.mentored.edges;

        if (!moreGoodFirstNodes.length && !moreMentoredNodes) {
          return previousResult;
        }

        pagingGood[JSON.stringify({ products, components })] =
          fetchMoreResult.goodFirst.pageInfo;
        pagingMen[JSON.stringify({ products, components })] =
          fetchMoreResult.mentored.pageInfo;

        return dotProp.set(
          dotProp.set(
            previousResult,
            'goodFirst.edges',
            previousResult.goodFirst.edges.concat(moreGoodFirstNodes)
          ),
          'mentored.edges',
          previousResult.mentored.edges.concat(moreMentoredNodes)
        );
      },
    });
  };

  fetchGithub = searchQuery => {
    const {
      github: { fetchMore },
    } = this.props;
    const endCursor =
      searchQuery in pagingGithub ? pagingGithub[searchQuery].endCursor : null;

    return fetchMore({
      query: githubInfoQuery,
      variables: {
        searchQuery,
        type: 'ISSUE',
        after: endCursor,
      },
      context: {
        client: 'github',
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const moreNodes = fetchMoreResult.search.nodes;

        if (!moreNodes.length) {
          return previousResult;
        }

        pagingGithub[searchQuery] = fetchMoreResult.search.pageInfo;

        return dotProp.set(
          previousResult,
          'search.nodes',
          previousResult.search.nodes.concat(moreNodes)
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

    const productWithNoComponentList = project.products
      ? project.products.filter(product => typeof product === 'string')
      : [];

    if (project.products)
      await this.fetchBugzilla(productWithNoComponentList, undefined);
  };

  render() {
    const { hasNextPage, isNextPageLoading, items, error } = this.state;
    const githubData = this.props.github;
    const bugzillaData = this.props.bugzilla;
    const project = projects[this.props.match.params.project];

    return (
      <Dashboard title={project.name}>
        {project.introduction && (
          <ProjectIntroductionCard introduction={project.introduction} />
        )}
        {error && <ErrorPanel error={error} />}
        {githubData && githubData.error && (
          <ErrorPanel error={githubData.error} />
        )}
        {bugzillaData && bugzillaData.error && (
          <ErrorPanel error={bugzillaData.error} />
        )}
        {isNextPageLoading && <Spinner />}
        <TasksTable
          onBugInfoClick={this.handleBugInfoClick}
          items={items}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          loadNextPage={this.loadNextPage}
        />
      </Dashboard>
    );
  }
}

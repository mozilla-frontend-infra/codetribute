import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import { memoizeWith, mergeAll } from 'ramda';
import uniqBy from 'lodash.uniqby';
import dotProp from 'dot-prop-immutable';
import TasksTable from '../../components/TasksTable';
import Dashboard from '../../components/Dashboard';
import ErrorPanel from '../../components/ErrorPanel';
import Spinner from '../../components/Spinner';
import bugsQuery from '../bugs.graphql';
import githubInfoQuery from '../githubInfo.graphql';
import commentsQuery from '../comments.graphql';
import {
  GOOD_FIRST_BUG,
  BUGZILLA_LANGUAGES,
  MENTORED_BUG,
  BUGZILLA_PAGING_OPTIONS,
  BUGZILLA_PAGE_SIZE,
  BUGZILLA_SEARCH_OPTIONS,
  BUGZILLA_UNASSIGNED,
} from '../../utils/constants';
import extractWhiteboardTags from '../../utils/extractWhiteboardTags';
import projects from '../../data/loader';

const getIgnoreCase = (object, keyToFind) => {
  const key = Object.keys(object).find(key => key.toLowerCase() === keyToFind);

  return key && object[key];
};

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
const pageCursors = {
  github: {},
  bzGoodFirst: {},
  bzMentored: {},
};

@withApollo
@hot(module)
@compose(
  graphql(githubInfoQuery, {
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
        type: 'REPOSITORY',
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
        params: { language },
      },
    }) => !getIgnoreCase(BUGZILLA_LANGUAGES, language),
    name: 'bugzilla',
    options: ({
      match: {
        params: { language },
      },
    }) => ({
      fetchPolicy: 'network-only',
      variables: {
        goodFirst: {
          ...BUGZILLA_SEARCH_OPTIONS,
          keywords: [GOOD_FIRST_BUG],
          whiteboards: `lang=${getIgnoreCase(BUGZILLA_LANGUAGES, language)}`,
        },
        mentored: {
          ...BUGZILLA_SEARCH_OPTIONS,
          ...MENTORED_BUG,
          whiteboards: `lang=${getIgnoreCase(BUGZILLA_LANGUAGES, language)}`,
        },
        goodFirstPaging: {
          ...BUGZILLA_PAGING_OPTIONS,
        },
        mentoredPaging: {
          ...BUGZILLA_PAGING_OPTIONS,
        },
      },
      context: {
        client: 'bugzilla',
      },
    }),
  })
)
export default class Languages extends Component {
  state = {
    isNextPageLoading: false,
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

  load = () => {
    this.setState({ isNextPageLoading: true });

    const {
      github: githubData,
      bugzilla: bugzillaData,
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
          .filter(
            repository =>
              repository.primaryLanguage &&
              repository.primaryLanguage.name.toLowerCase().includes(language)
          )
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

    tagsMapping[language] = Object.keys(repos);

    if (
      !(language in pageCursors.bzGoodFirst) &&
      !(language in pageCursors.bzMentored) &&
      !Object.keys(tagsMapping).some(x => x in pageCursors.github)
    ) {
      pageCursors.github = {};
      pageCursors.bzGoodFirst = {};
      pageCursors.bzMentored = {};
    }

    Promise.all(
      Object.entries(tagsMapping).map(([tag, repos]) => {
        const searchQuery = [
          repos.map(repo => `repo:${repo}`).join(' '),
          `label:"${tag}"`,
          'state:open',
        ].join(' ');

        return this.fetchGithub(searchQuery);
      })
    );

    if (bugzillaData) this.fetchBugzilla(language);

    this.setState({ isNextPageLoading: false });
  };

  fetchGithub = searchQuery => {
    const {
      github: { fetchMore },
    } = this.props;
    const endCursor =
      searchQuery in pageCursors.github
        ? pageCursors.github[searchQuery].endCursor
        : null;

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

        pageCursors.github[searchQuery] = fetchMoreResult.search.pageInfo;

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

  fetchBugzilla = language => {
    const {
      bugzilla: { fetchMore },
    } = this.props;
    const goodFirstPage =
      language in pageCursors.bzGoodFirst
        ? pageCursors.bzGoodFirst[language].nextPage
        : 0;
    const mentoredPage =
      language in pageCursors.bzMentored
        ? pageCursors.bzMentored[language].nextPage
        : 0;

    return fetchMore({
      query: bugsQuery,
      variables: {
        goodFirst: {
          ...BUGZILLA_SEARCH_OPTIONS,
          keywords: [GOOD_FIRST_BUG],
          whiteboards: `lang=${getIgnoreCase(BUGZILLA_LANGUAGES, language)}`,
        },
        mentored: {
          ...BUGZILLA_SEARCH_OPTIONS,
          ...MENTORED_BUG,
          whiteboards: `lang=${getIgnoreCase(BUGZILLA_LANGUAGES, language)}`,
        },
        goodFirstPaging: {
          page: goodFirstPage,
          pageSize: BUGZILLA_PAGE_SIZE,
        },
        mentoredPaging: {
          page: mentoredPage,
          pageSize: BUGZILLA_PAGE_SIZE,
        },
      },
      context: {
        client: 'bugzilla',
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const moreGoodFirstNodes = fetchMoreResult.goodFirst.edges;
        const moreMentoredNodes = fetchMoreResult.mentored.edges;

        pageCursors.bzGoodFirst[language] = fetchMoreResult.goodFirst.pageInfo;
        pageCursors.bzMentored[language] = fetchMoreResult.mentored.pageInfo;

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
      github: githubData,
      bugzilla: bugzillaData,
      match: {
        params: { language },
      },
    } = this.props;
    const { isNextPageLoading, error } = this.state;
    const title = Object.keys(BUGZILLA_LANGUAGES).find(
      lang => lang.toLowerCase() === language
    );
    const issues =
      (githubData &&
        githubData.search &&
        uniqBy(
          githubData.search.nodes
            .filter(issue => issue.title)
            .map(issue => ({
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
          'summary'
        )) ||
      [];
    const goodFirstBugs =
      (bugzillaData &&
        bugzillaData.goodFirst &&
        uniqBy(
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
        )) ||
      [];
    const mentoredBugs =
      (bugzillaData &&
        bugzillaData.mentored &&
        uniqBy(
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
        )) ||
      [];
    const hasNextPage =
      Object.keys(pageCursors.github).some(
        x => pageCursors.github[x].hasNextPage
      ) ||
      Object.keys(pageCursors.bzGoodFirst).some(
        x => pageCursors.bzGoodFirst[x].hasNextPage
      ) ||
      Object.keys(pageCursors.bzMentored).some(
        x => pageCursors.bzMentored[x].hasNextPage
      );
    const items = uniqBy(
      [...issues, ...goodFirstBugs, ...mentoredBugs],
      'summary.title'
    );

    return (
      <Dashboard title={title} withSidebar>
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
          loadNextPage={this.load}
        />
      </Dashboard>
    );
  }
}

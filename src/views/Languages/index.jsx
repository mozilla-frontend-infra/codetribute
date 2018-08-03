import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import { memoizeWith } from 'ramda';
import uniqBy from 'lodash.uniqby';
import TasksTable from '../../components/TasksTable';
import Dashboard from '../../components/Dashboard';
import ErrorPanel from '../../components/ErrorPanel';
import Spinner from '../../components/Spinner';
import bugsQuery from '../bugs.graphql';
import commentsQuery from '../comments.graphql';
import {
  GOOD_FIRST_BUG,
  BUGZILLA_LANGUAGES,
  MENTORED_BUG,
  BUGZILLA_PAGING_OPTIONS,
  BUGZILLA_SEARCH_OPTIONS,
} from '../../utils/constants';
import extractWhiteboardTags from '../../utils/extractWhiteboardTags';

const getIgnoreCase = (object, keyToFind) => {
  const key = Object.keys(object).find(key => key.toLowerCase() === keyToFind);

  return key && object[key];
};

@withApollo
@hot(module)
@graphql(bugsQuery, {
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
      paging: {
        ...BUGZILLA_PAGING_OPTIONS,
      },
    },
    context: {
      client: 'bugzilla',
    },
  }),
})
export default class Languages extends Component {
  state = {
    error: null,
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
    const { bugzilla: bugzillaData } = this.props;
    const { error } = this.state;
    const goodFirstBugs =
      (bugzillaData &&
        bugzillaData.goodFirst &&
        uniqBy(
          bugzillaData.goodFirst.edges.map(edge => edge.node).map(bug => ({
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
    const mentoredBugs =
      (bugzillaData &&
        bugzillaData.mentored &&
        uniqBy(
          bugzillaData.mentored.edges.map(edge => edge.node).map(bug => ({
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
      <Dashboard withSidebar>
        {error && <ErrorPanel error={error} />}
        {bugzillaData &&
          bugzillaData.error && <ErrorPanel error={bugzillaData.error} />}
        {bugzillaData && bugzillaData.loading && <Spinner />}
        {(!bugzillaData || !bugzillaData.loading) && (
          <TasksTable
            items={[...goodFirstBugs, ...mentoredBugs]}
            onBugInfoClick={this.handleBugInfoClick}
          />
        )}
      </Dashboard>
    );
  }
}

import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import dotProp from 'dot-prop-immutable';
import { mergeAll } from 'ramda';
import uniqBy from 'lodash.uniqby';
import { withStyles } from '@material-ui/core/styles';
import projects from '../../../data/loader';
import Spinner from '../../../components/Spinner/index';
import ErrorPanel from '../../../components/ErrorPanel/index';
import TasksTable from '../../../components/TasksTable/index';
import bugsQuery from '../bugs.graphql';
import {
  MENTORED_BUG,
  BUGZILLA_STATUSES,
  BUGZILLA_PAGE_NUMBER,
  BUGZILLA_PAGE_SIZE,
  BUGZILLA_ORDER,
} from '../../../utils/constants';
import extractWhiteboardTags from '../../../utils/extractWhiteboardTags';

const bugzillaSearchOptions = {
  ...MENTORED_BUG,
  statuses: Object.values(BUGZILLA_STATUSES),
  order: BUGZILLA_ORDER,
};
const bugzillaPagingOptions = {
  page: BUGZILLA_PAGE_NUMBER,
  pageSize: BUGZILLA_PAGE_SIZE,
};
const productsWithNoComponents = products =>
  products.filter(product => typeof product === 'string');

@hot(module)
@graphql(bugsQuery, {
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
      search: {
        ...bugzillaSearchOptions,
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
        ...bugzillaPagingOptions,
      },
    },
    context: {
      client: 'bugzilla',
    },
  }),
})
@withStyles(theme => ({
  spinner: {
    marginTop: 3 * theme.spacing.unit,
  },
}))
export default class Project extends Component {
  state = {
    loading: true,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.bugzilla &&
      prevProps.bugzilla.loading &&
      !this.props.bugzilla.loading
    ) {
      this.load();
    }
  }
  fetchBugzilla = (products, components) => {
    const {
      bugzilla: { fetchMore },
    } = this.props;

    return fetchMore({
      query: bugsQuery,
      variables: {
        search: {
          ...bugzillaSearchOptions,
          products,
          components,
        },
        paging: {
          ...bugzillaPagingOptions,
        },
      },
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

  load = async () => {
    const project = projects[this.props.match.params.project];
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

  render() {
    const {
      classes,
      bugzilla: bugzillaData,
      match: {
        params: { project },
      },
    } = this.props;
    const loading = this.state.loading && projects[project].products;
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
            url: `https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}`,
          })),
          'summary'
        )) ||
      [];

    return (
      <Fragment>
        {bugzillaData &&
          bugzillaData.error && <ErrorPanel error={bugzillaData.error} />}
        {loading && <Spinner className={classes.spinner} />}
        {!loading && <TasksTable items={bugs} />}
      </Fragment>
    );
  }
}

import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
import ErrorPanel from '../../components/ErrorPanel';
import TasksTable from '../../components/TasksTable';
import Issues from './issues.graphql';
import Bugs from './bugs.graphql';

const githubQuery = fileName => {
  const projectInfo = projects[fileName];
  // dictionary with repo as key and tag as value
  const tmp = projectInfo.repositories
    ? projectInfo.repositories.reduce((prev, cur) => ({ ...prev, ...cur }), {})
    : {};
  // initial query search for all repo
  const repoQuerySearch = ['state:open'];
  // a dictionary of tag (string) and list of repository in that tag
  const tagRepoDictionary = Object.keys(tmp).reduce((prev, key) => {
    const curr = [
      ...(prev[tmp[key]] || [...repoQuerySearch, `label:${tmp[key]}`]),
      `repo:${key}`,
    ];

    return {
      ...prev,
      [tmp[key]]: curr,
    };
  }, {});
  const tagRepoList = Object.entries(tagRepoDictionary).map(([key, value]) => ({
    label: key,
    query: value.join(' '),
  }));

  if (tagRepoList.length === 0) return;

  let allQuery = '';

  tagRepoList.forEach((tag, idx) => {
    const noCursorQuery = `_${idx}: search(first:100, type:ISSUE, query:"${
      tag.query
    }")\n
      {
      ...Issues
      }\n`;
      const cursorQuery = `_${idx}: search(first:20, type:ISSUE, query:"${
        tag.query
      }", after:${tag.after})\n
      {
      ...Issues
      }\n`;

    allQuery = allQuery.concat(noCursorQuery);
  });

  return allQuery;
};

@hot(module)
class Project extends Component {
  state = {
    error: false,
    loading: false,
    data: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.githubData) return;

    const issuesData = Object.values(nextProps.githubData.data).reduce(
      (previous, repoData) => [
        ...previous,
        ...repoData.nodes.map(issue => {
          const obj = {
            project: issue.repository.name,
            id: issue.number,
            summary: `${issue.number} - ${issue.title}`,
            tag: issue.labels.nodes.map(node => node.name).join(','),
            lastUpdated: issue.updatedAt,
            assignee: issue.assignees.nodes[0]
              ? issue.assignees.nodes[0].login
              : 'None',
          };

          return obj;
        }),
      ],
      []
    );

    return {
      data: _.uniqBy([...prevState.data, ...issuesData], 'summary').sort(
        (a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)
      ),
      error: nextProps.githubData.error,
      loading: nextProps.githubData.loading,
    };
  }

  fetchBugs(variables) {
    const { client } = this.props;

    client
      .query({
        query: Bugs,
        variables,
        context: { link: 'bugzilla' },
      })
      .catch(
        () =>
          new Promise(resolve => {
            resolve(false);
          })
      )
      .then(({ data, loading, error }) => {
        const bugsData = data.bug.edges.map(edge => edge.node).map(bug => ({
          assignedto: bug.assignedTo.name || 'None',
          project: bug.component,
          id: bug.id,
          tag: bug.tags || '',
          description: `${bug.id} - ${bug.summary}`,
          lastupdate: bug.lastChanged,
        }));

        this.setState({
          data: _.uniqBy([...this.state.data, ...bugsData], 'description').sort(
            (a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)
          ),
          loading,
          error,
        });
      });
  }
  fetchBugzillaDataNext() {
    const { productList, productComponentList } = this.state;
    const variables = {
      searchProduct: {
        products: productList,
        tags: ['good-first-bug'],
        statuses: ['NEW', 'UNCONFIRMED', 'ASSIGNED', 'REOPENED'],
      },
      paging: {
        page: 0,
        pageSize: 100,
      },
    };

    // fetch bugs for products with no components
    this.fetchBugs(variables, 'products');

    // fetch bugs for each product that has components
    productComponentList.forEach(item => {
      variables.searchProduct.products = item.products;
      variables.searchProduct.components = item.components;

      this.fetchBugs(variables, item.products);
    });
  }


  render() {
    const project = projects[this.props.match.params.project];
    const { loading, error, data } = this.state;

    return (
      <Fragment>
        <header>
          <Typography variant="display2" align="center">
            {project.name}
          </Typography>
          <Typography variant="subheading" align="center">
            Bugs & Issues
          </Typography>
        </header>
        {error && <ErrorPanel error={error} />}
        {loading && <Spinner />}
        {!error && !loading && <TasksTable items={data} />}
      </Fragment>
    );
  }
}

const ProjectClient = props => (
  <Query
    query={gql`{${githubQuery(props.match.params.project)}}\n${Issues}`}
    skip={projects[props.match.params.project].repositories === undefined}>
    {githubData => <Project match={props.match} githubData={githubData} />}
  </Query>
);

export default ProjectClient;

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

    allQuery = allQuery.concat(noCursorQuery);
  });

  return allQuery;
};

const bugzillaQuery = fileName => {
  const project = projects[fileName];
  // combine queries for product with no component
  const productList = project.products.filter(
    product => typeof product === 'string'
  );
  const productTemp = project.products
    .filter(product => typeof product !== 'string')
    .reduce((prev, cur) => ({ ...prev, ...cur }), {});
  const productComponentList = Object.entries(productTemp).map(
    ([key, value]) => ({ products: [key], components: value })
  );
  const variable = {
    search: {
      products: productList,
      tags: ['good-first-bug'],
      statuses: ['NEW', 'UNCONFIRMED', 'ASSIGNED', 'REOPENED'],
    },
    paging: {
      page: 0,
      pageSize: 100,
    },
  };
  // put the product without component into query
  let allQuery = `_0: bugs(search: ${JSON.stringify(
    variable.search
  )}, paging:${JSON.stringify(variable.paging)}){...Bugs}\n`.replace(
    /"([^(")"]+)":/g,
    '$1:'
  );

  // add product with component into query
  productComponentList.forEach((item, idx) => {
    variable.search.products = item.products;
    variable.search.components = item.components;
    const thisQuery = `_${idx + 1}: bugs(search: ${JSON.stringify(
      variable.search
    )}, paging:${JSON.stringify(variable.paging)}){...Bugs}\n`.replace(
      /"([^(")"]+)":/g,
      '$1:'
    );

    allQuery += thisQuery;
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
    if (!nextProps.githubData || !nextProps.bugzillaData) return;

    const issuesData =
      Object.values(nextProps.githubData.data).reduce(
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
      ) || [];
    const bugzillaData = Object.values(nextProps.bugzillaData.data)
      .map(data => data.edges)
      .reduce((prev, curr) => [...prev, ...curr.map(cur => cur.node)], [])
      .map(bug => ({
        assignee: bug.assignedTo.name || 'None',
        project: bug.component,
        id: bug.id,
        tag: bug.tags || '',
        summary: `${bug.id} - ${bug.summary}`,
        lastUpdated: bug.lastChanged,
      }));

    return {
      data: _.uniqBy(
        [...prevState.data, ...issuesData, ...bugzillaData],
        'summary'
      ).sort((a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)),
      error: nextProps.githubData.error || nextProps.bugzillaData.error,
      loading: nextProps.githubData.loading && nextProps.bugzillaData.loading,
    };
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
    query={gql`{${bugzillaQuery(props.match.params.project)}}
      ${Bugs}
    `}
    skip={projects[props.match.params.project].products === undefined}
    context={{ link: 'bugzilla' }}>
    {bugzillaData => (
      <Query
        query={gql`{${githubQuery(props.match.params.project)}}\n${Issues}`}
        skip={projects[props.match.params.project].repositories === undefined}
        context={{ link: 'github' }}>
        {githubData => (
          <Project
            match={props.match}
            githubData={githubData}
            bugzillaData={bugzillaData}
          />
        )}
      </Query>
    )}
  </Query>
);

export default ProjectClient;

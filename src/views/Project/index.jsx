import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import uniqBy from 'lodash.uniqby';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
import ErrorPanel from '../../components/ErrorPanel';
import TasksTable from '../../components/TasksTable';
import Issues from './issues.graphql';

const getProject = fileName => projects[fileName] || {};
/*
Example input:
{ ["mozilla/butter": "mentored"],
  ["mozilla/memchaser: "mentored"],
  ["mozilla/coversheet":"good-first-bug"]
}
Output:
{ "mozilla/butter": "mentored",
  "mozilla/memchaser: "mentored",
  "mozilla/coversheet":"good-first-bug"
}
 */
const mergeListOfObjects = objects =>
  objects ? objects.reduce((prev, cur) => ({ ...prev, ...cur }), {}) : {};
/*
Example input:
{ "mozilla/butter": "mentored",
  "mozilla/memchaser: "mentored",
  "mozilla/coversheet":"good-first-bug"
}
Output:
{
  "mentored" : ["mozilla/butter", "mozilla/memchaser"],
  "good-first-bug" : ["mozilla/coversheet"]
}
 */
const reversePropertyValue = object =>
  Object.keys(object).reduce((prev, key) => {
    const curr = [...(prev[object[key]] || []), key];

    return {
      ...prev,
      [object[key]]: curr,
    };
  }, {});
const githubQuery = fileName => {
  const project = getProject(fileName);
  const repositories = mergeListOfObjects(project.repositories);
  // Group the project based on tag / label
  const tagRepositoriesObject = reversePropertyValue(repositories);
  let queryString = '';
  const repoStateString = 'state:open';

  Object.entries(tagRepositoriesObject).forEach(([tag, repos], idx) => {
    const repoString = repos.map(repo => `repo:${repo}`).join(' ');
    const tagString = `label:${tag}`;
    const queryVariables = [repoString, tagString, repoStateString].join(' ');
    const query = `_${idx}: search(first:100, type:ISSUE, query:"${queryVariables}")\n
      {
      ...Issues
      }\n`;

    queryString = queryString.concat(query);
  });

  if (queryString.length === 0) {
    return;
  }

  return queryString;
};

@hot(module)
class Project extends Component {
  state = {
    error: false,
    loading: false,
    data: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.githubData) {
      return;
    }

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
      data: uniqBy([...prevState.data, ...issuesData], 'summary').sort(
        (a, b) => (a.lastupdate > b.lastupdate ? -1 : 1)
      ),
      error: nextProps.githubData.error,
      loading: nextProps.githubData.loading,
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
    query={gql`{${githubQuery(props.match.params.project)}}\n${Issues}`}
    skip={!projects[props.match.params.project].repositories}>
    {githubData => <Project match={props.match} githubData={githubData} />}
  </Query>
);

export default ProjectClient;

import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import uniqBy from 'lodash.uniqby';
import { withRouter } from 'react-router-dom';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
import ErrorPanel from '../../components/ErrorPanel';
import TasksTable from '../../components/TasksTable';
import issuesQuery from './issues.graphql';

const getProject = fileName => projects[fileName] || {};
/*
Example input:
[ {"mozilla/butter": "mentored"},
  {"mozilla/memchaser: "mentored"},
  {"mozilla/coversheet":"good-first-bug"}
]
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
  const tagReposMapping = reversePropertyValue(repositories);
  let queryString = '';
  const repoStateString = 'state:open';

  Object.entries(tagReposMapping).forEach(([tag, repos], idx) => {
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

@withRouter
@hot(module)
class Project extends Component {
  state = {
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
            url: issue.url,
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
    };
  }

  render() {
    const project = projects[this.props.match.params.project];
    const { data } = this.state;
    const { loading, error } = this.props.githubData;

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
    query={gql`{${githubQuery(props.match.params.project)}}\n${issuesQuery}`}
    skip={!projects[props.match.params.project].repositories}>
    {githubData => <Project githubData={githubData} />}
  </Query>
);

export default ProjectClient;

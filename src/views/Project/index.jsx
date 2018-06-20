import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import dotProp from 'dot-prop-immutable';
import { mergeAll } from 'ramda';
import uniqBy from 'lodash.uniqby';
import Typography from '@material-ui/core/Typography';
import Markdown from 'react-markdown';
import projects from '../../data/loader';
import Spinner from '../../components/Spinner';
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
    const { data } = this.props;
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
            tag: issue.labels.nodes.map(node => node.name).join(','),
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
      <Fragment>
        <header>
          <Typography variant="display2" align="center">
            {project.name}
          </Typography>
          <Typography variant="subheading" align="center">
            Bugs & Issues
          </Typography>
          {project.introduction && (
            <Typography variant="body1">
              <Markdown source={project.introduction} />
            </Typography>
          )}
          {data && data.error && <ErrorPanel error={data.error} />}
          {loading && <Spinner />}
          {!loading && <TasksTable items={issues} />}
        </header>
      </Fragment>
    );
  }
}

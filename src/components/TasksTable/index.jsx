import { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FilterVariantIcon from 'mdi-react/FilterVariantIcon';
import LinkIcon from 'mdi-react/LinkIcon';
import { withRouter } from 'react-router-dom';
import { arrayOf, object } from 'prop-types';
import { camelCase } from 'change-case';
import { formatDistance } from 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { memoizeWith, omit, pipe, sort as rSort, map } from 'ramda';
import { stringify, parse } from 'qs';
import classNames from 'classnames';
import DataTable from '../DataTable';
import sort from '../../utils/sort';
import { unassigned, assigned } from '../../utils/assignmentFilters';
import { ASSIGNEE, ALL_PROJECTS } from '../../utils/constants';

const sorted = pipe(
  rSort((a, b) => sort(a.summary, b.summary)),
  map(({ project, summary }) => `${summary}-${project}`)
);
const assignments = Object.values(ASSIGNEE);

@withRouter
@withStyles(theme => ({
  summary: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    width: 450,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  clickedChip: {
    backgroundColor: theme.palette.secondary.dark,
    '&:focus': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  tags: {
    whiteSpace: 'nowrap',
  },
  summaryItem: {
    marginLeft: -theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  dropdown: {
    minWidth: 200,
    marginRight: 2 * theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  filter: {
    ...theme.mixins.gutters(),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit,
  },
  summaryText: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
}))
export default class TasksTable extends Component {
  state = {
    showFilterContent: false,
  };

  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    items: arrayOf(object).isRequired,
  };

  getTableData = memoizeWith(
    (
      sortBy = 'Last Updated',
      sortDirection = 'desc',
      tag,
      items,
      assignee,
      project
    ) => {
      const ids = sorted(items);

      return `${ids.join(
        '-'
      )}-${sortBy}-${sortDirection}-${tag}-${assignee}-${project}`;
    },
    (
      sortBy = 'Last Updated',
      sortDirection = 'desc',
      tag,
      items,
      assignee,
      project
    ) => {
      const sortByProperty = camelCase(sortBy);
      let filteredItems = [];

      if (assignee === ASSIGNEE.ANY) {
        filteredItems = items;
      } else if (assignee === ASSIGNEE.ASSIGNED) {
        filteredItems = items.filter(assigned);
      } else {
        filteredItems = items.filter(unassigned);
      }

      return filteredItems
        .filter(
          item =>
            (!tag || item.tags.includes(tag)) &&
            (!project || project === ALL_PROJECTS || item.project === project)
        )
        .sort((a, b) => {
          const firstElement =
            sortDirection === 'desc' ? b[sortByProperty] : a[sortByProperty];
          const secondElement =
            sortDirection === 'desc' ? a[sortByProperty] : b[sortByProperty];

          return sort(firstElement, secondElement);
        });
    }
  );

  getQuery() {
    const { location } = this.props;
    const query = parse(location.search.slice(1));

    return query;
  }

  setQuery = query => {
    this.props.history.push({
      search: `?${stringify(query)}`,
    });
  };

  handleFilterToggle = () => {
    this.setState({ showFilterContent: !this.state.showFilterContent });
  };

  handleFilterChange = ({ target: { name, value } }) => {
    const query = this.getQuery();

    this.setQuery({ ...query, [name]: value });
  };

  handleHeaderClick = sortBy => {
    if (sortBy === 'Tags') {
      return;
    }

    const query = this.getQuery();
    const toggled = query.sortDirection === 'desc' ? 'asc' : 'desc';
    const sortDirection = query.sortBy === sortBy ? toggled : 'desc';

    this.setQuery({ ...query, sortBy, sortDirection });
  };

  handleTagClick = ({ currentTarget }) => {
    const tag = currentTarget.getAttribute('name');
    const query = this.getQuery();
    const newQuery =
      query.tag === tag ? omit(['tag'], query) : { ...query, tag };

    this.setQuery(newQuery);
  };

  handleRandomTaskClick = () => {
    const { items } = this.props;
    const unassignedItems = items.filter(unassigned);
    const url = unassignedItems.length
      ? unassignedItems[Math.floor(Math.random() * unassignedItems.length)].url
      : items[Math.floor(Math.random() * items.length)].url;

    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  };

  handleResetClick = () => {
    this.setQuery({});
  };

  render() {
    const { items, classes } = this.props;
    const { showFilterContent } = this.state;
    const query = this.getQuery();
    const { sortBy, sortDirection, tag, assignee, project } = query;
    const assignment = assignments.includes(assignee)
      ? assignee
      : ASSIGNEE.UNASSIGNED;
    const data = this.getTableData(
      sortBy,
      sortDirection,
      tag,
      items,
      assignee,
      project
    );
    const iconSize = 14;
    const projects = [...new Set(items.map(item => item.project))];
    const filters = (
      <div className={classes.filter}>
        <TextField
          select
          name="assignee"
          label="Assignee"
          value={assignment}
          className={classes.dropdown}
          onChange={this.handleFilterChange}>
          {assignments.map(assignee => (
            <MenuItem key={assignee} value={assignee}>
              {assignee}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="project"
          label="Project"
          value={project || ALL_PROJECTS}
          className={classes.dropdown}
          onChange={this.handleFilterChange}>
          <MenuItem value={ALL_PROJECTS}>{ALL_PROJECTS}</MenuItem>
          {projects.map(project => (
            <MenuItem key={project} value={project}>
              {project}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" size="small" onClick={this.handleResetClick}>
          Reset
        </Button>
      </div>
    );

    return (
      <Fragment>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title">Bugs & Issues</Typography>
          <IconButton onClick={this.handleFilterToggle}>
            <FilterVariantIcon />
          </IconButton>
        </Toolbar>
        {showFilterContent && filters}
        <div className={classes.flexContainer}>
          <Button
            color="primary"
            disabled={!items.length}
            onClick={this.handleRandomTaskClick}>
            I’m Feeling Adventurous
          </Button>
        </div>
        <div className={classes.tableWrapper}>
          <DataTable
            items={data}
            renderRow={item => (
              <TableRow tabIndex={-1} key={item.summary}>
                <TableCell component="th" scope="row">
                  {item.project}
                </TableCell>
                <TableCell>
                  <List dense className={classes.summary}>
                    <ListItem
                      classes={{
                        gutters: classes.summaryItem,
                      }}
                      title={item.summary}
                      button
                      target="_blank"
                      rel="noopener noreferrer"
                      component="a"
                      href={item.url}>
                      <ListItemText
                        primary={
                          <div className={classes.summaryText}>
                            {item.summary}
                          </div>
                        }
                      />
                      <LinkIcon size={iconSize} />
                    </ListItem>
                  </List>
                </TableCell>
                <TableCell className={classes.tags}>
                  {item.tags.map(tag => (
                    <Chip
                      name={tag}
                      key={tag}
                      label={tag}
                      className={classNames({
                        [classes.clickedChip]: tag === query.tag,
                      })}
                      onClick={this.handleTagClick}
                    />
                  ))}
                </TableCell>
                <TableCell>{item.assignee}</TableCell>
                <TableCell>
                  {formatDistance(item.lastUpdated, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            )}
            headers={['Project', 'Summary', 'Tags', 'Assignee', 'Last Updated']}
            sortByHeader={sortBy}
            sortDirection={sortDirection}
            onHeaderClick={this.handleHeaderClick}
          />
        </div>
      </Fragment>
    );
  }
}

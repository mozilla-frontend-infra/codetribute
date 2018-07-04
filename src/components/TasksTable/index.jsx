import { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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
import { ASSIGNEE } from '../../utils/constants';

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
  },
  filter: {
    ...theme.mixins.gutters(),
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit,
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
    (sortBy = 'Last Updated', sortDirection = 'desc', tag, items, assignee) => {
      const ids = sorted(items);

      return `${ids.join('-')}-${sortBy}-${sortDirection}-${tag}-${assignee}`;
    },
    (sortBy = 'Last Updated', sortDirection = 'desc', tag, items, assignee) => {
      const sortByProperty = camelCase(sortBy);
      let filteredItems = [];

      if (assignee === ASSIGNEE.ANY) {
        filteredItems = items;
      } else if (assignee === ASSIGNEE.ASSIGNED) {
        filteredItems = items.filter(item => item.assignee !== '-');
      } else {
        filteredItems = items.filter(item => item.assignee === '-');
      }

      return filteredItems
        .filter(item => !tag || item.tags.includes(tag))
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

  handleFilterChange = event => {
    const query = this.getQuery();

    this.setQuery({ ...query, assignee: event.target.value });
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

  handleRandomButtonClick = () => {
    const { items } = this.props;
    const unassignedItems = items.filter(item => item.assignee === '-');
    const url = unassignedItems.length
      ? unassignedItems[Math.floor(Math.random() * unassignedItems.length)].url
      : items[Math.floor(Math.random() * items.length)].url;

    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  };

  render() {
    const { items, classes } = this.props;
    const { showFilterContent } = this.state;
    const query = this.getQuery();
    const { sortBy, sortDirection, tag, assignee } = query;
    const assignment = assignments.includes(assignee)
      ? assignee
      : ASSIGNEE.UNASSIGNED;
    const data = this.getTableData(sortBy, sortDirection, tag, items, assignee);
    const iconSize = 14;

    return (
      <Fragment>
        <div className={classes.flexContainer}>
          <Button
            variant="contained"
            color="primary"
            disabled={!items.length}
            onClick={this.handleRandomButtonClick}>
            I’m Feeling Adventurous
          </Button>
        </div>
        <div className={classes.tableWrapper}>
          <DataTable
            title="Bugs & Issues"
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
                      button
                      target="_blank"
                      rel="noopener noreferrer"
                      component="a"
                      href={item.url}>
                      <ListItemText>{item.summary}</ListItemText>
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
            filters={
              showFilterContent && (
                <div className={classes.filter}>
                  <TextField
                    select
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
                </div>
              )
            }
            onFilterClick={this.handleFilterToggle}
          />
        </div>
      </Fragment>
    );
  }
}

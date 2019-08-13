import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import transitions from '@material-ui/core/styles/transitions';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import LinkIcon from 'mdi-react/LinkIcon';
import InformationVariantIcon from 'mdi-react/InformationVariantIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { withRouter } from 'react-router-dom';
import { arrayOf, object } from 'prop-types';
import { camelCase } from 'change-case';
import Linkify from 'react-linkify';
import { formatDistance, parseISO, differenceInCalendarDays } from 'date-fns';
import { memoizeWith, omit, pipe, sort as rSort, map } from 'ramda';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { stringify, parse } from 'qs';
import classNames from 'classnames';
import DataTable from '../DataTable';
import sort from '../../utils/sort';
import { unassigned, assigned } from '../../utils/assignmentFilters';
import { ASSIGNEE, ALL_PROJECTS } from '../../utils/constants';

const getTaskHelperText = item => {
  const daysSinceLastUpdate = differenceInCalendarDays(
    new Date(),
    parseISO(item.lastUpdated)
  );

  if (item.assignee === '-' && daysSinceLastUpdate < 90) {
    return 'The task is assigned to nobody. Ask in the comments to have it assigned to you.';
  }

  if (item.assignee === '-') {
    return 'The task is assigned to nobody but a few months have passed. Ask in the comments if this task is still relevant to tackle and whether you could have it assigned to you.';
  }

  if (daysSinceLastUpdate > 30) {
    return 'The task is assigned but has not been touched for over a month. Ask in the comments if you can have it assigned to you.';
  }

  return `This was recently assigned to ${item.assignee}.`;
};

const sorted = pipe(
  rSort((a, b) => sort(a.summary.title, b.summary.title)),
  map(({ project, summary }) => `${summary.title}-${project}`)
);
const assignments = Object.values(ASSIGNEE);

@withRouter
@withStyles(theme => ({
  summary: {
    display: 'inline-block',
    width: 450,
  },
  clickedChip: {
    backgroundColor: theme.palette.secondary.dark,
    '&:focus': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  tableCell: {
    whiteSpace: 'nowrap',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.8125rem',
    fontWeight: 400,
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
    marginBottom: theme.spacing.unit * 3,
  },
  summaryText: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    color: 'inherit',
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    whiteSpace: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: {
    adventurousButton: {
      order: 2,
      margin: `${theme.spacing.unit}px 0`,
    },
    toolbar: {
      justifyContent: 'flex-start',
    },
  },
  icon: {
    flexShrink: 0,
  },
  infoButton: {
    marginRight: theme.spacing.unit,
    marginLeft: -2 * theme.spacing.unit,
  },
  drawerPaper: {
    width: 400,
    maxWidth: '100%',
  },
  drawerCloseButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    zIndex: theme.zIndex.drawer + 1,
  },
  listItemButton: {
    '& svg': {
      transition: transitions.create('fill'),
      fill: lighten(theme.palette.secondary.contrastText, 0.5),
    },
    '&:hover svg': {
      fill: theme.palette.secondary.contrastText,
    },
  },
}))
export default class TasksTable extends Component {
  static propTypes = {
    /**
     * A list of objects to display. Each element in the list is represented
     * by a row and each element's key-value pair represents a column.
     */
    items: arrayOf(object).isRequired,
  };

  static defaultProps = {
    rowHeight: 51,
  };

  state = {
    drawerOpen: false,
    drawerItem: null,
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
          let firstElement;
          let secondElement;

          if (sortByProperty === 'summary') {
            firstElement =
              sortDirection === 'desc'
                ? b[sortByProperty].title
                : a[sortByProperty].title;
            secondElement =
              sortDirection === 'desc'
                ? a[sortByProperty].title
                : b[sortByProperty].title;
          } else {
            firstElement =
              sortDirection === 'desc' ? b[sortByProperty] : a[sortByProperty];
            secondElement =
              sortDirection === 'desc' ? a[sortByProperty] : b[sortByProperty];
          }

          return sort(firstElement, secondElement);
        });
    }
  );

  getQuery() {
    const { location } = this.props;
    const query = parse(decodeURIComponent(location.search.slice(1)));

    return query;
  }

  setQuery = query => {
    this.props.history.push({
      search: `?${encodeURIComponent(stringify(query))}`,
    });
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
      ? unassignedItems[Math.floor(Math.random() * unassignedItems.length)]
          .summary.url
      : items[Math.floor(Math.random() * items.length)].summary.url;

    if (url) {
      Object.assign(window.open(), {
        opener: null,
        location: url,
        target: '_blank',
      });
    }
  };

  handleResetClick = () => {
    this.setQuery({});
  };

  handleDrawerOpen = async ({ currentTarget: { name } }) => {
    const item = this.props.items.find(item => item.summary.title === name);

    this.setState({
      drawerOpen: true,
      drawerItem: {
        ...item,
        ...(item.summary.url.includes('bugzilla.mozilla.org')
          ? { description: await this.props.onBugInfoClick(item.id) }
          : null),
      },
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
      drawerItem: null,
    });
  };

  render() {
    const {
      items,
      hasNextPage,
      isNextPageLoading,
      loadNextPage,
      rowHeight,
      classes,
    } = this.props;
    const { drawerOpen, drawerItem } = this.state;
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
    const projects = [
      ...new Set(
        items
          .map(item => item.project)
          .sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: 'base' })
          )
      ),
    ];

    return (
      <Fragment>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title} id="tableTitle">
            Bugs & Issues
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            disabled={!items.length}
            onClick={this.handleRandomTaskClick}
            className={classes.adventurousButton}>
            I’m Feeling Adventurous
          </Button>
        </Toolbar>
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
          <Button
            variant="outlined"
            size="small"
            onClick={this.handleResetClick}>
            Reset
          </Button>
        </div>
        <DataTable
          hasNextPage={hasNextPage}
          loadNextPage={loadNextPage}
          isNextPageLoading={isNextPageLoading}
          sortByHeader={sortBy}
          sortDirection={sortDirection}
          onHeaderClick={this.handleHeaderClick}
          cellRenderer={({ cellData, columnIndex }) => {
            if (columnIndex === 0) {
              return (
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCell}
                  style={{ height: rowHeight }}>
                  {cellData}
                </TableCell>
              );
            }

            if (columnIndex === 1) {
              return (
                <TableCell
                  className={classes.tableCell}
                  style={{ height: rowHeight }}>
                  <IconButton
                    name={cellData.title}
                    aria-label="Information"
                    className={classes.infoButton}
                    onClick={this.handleDrawerOpen}>
                    <InformationVariantIcon />
                  </IconButton>
                  <List
                    dense
                    disablePadding
                    className={classes.summary}
                    component="div">
                    <ListItem
                      className={classes.listItemButton}
                      classes={{
                        gutters: classes.summaryItem,
                      }}
                      title={cellData.title}
                      button
                      target="_blank"
                      rel="noopener noreferrer"
                      component="a"
                      href={cellData.url}>
                      <ListItemText
                        primary={
                          <div className={classes.summaryText}>
                            {cellData.title}
                          </div>
                        }
                      />
                      <LinkIcon className={classes.icon} size={iconSize} />
                    </ListItem>
                  </List>
                </TableCell>
              );
            }

            if (columnIndex === 2) {
              return (
                <TableCell
                  className={classes.tableCell}
                  style={{ height: rowHeight }}>
                  {cellData.map(tag => (
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
              );
            }

            if (columnIndex === 3) {
              return (
                <TableCell
                  className={classes.tableCell}
                  style={{ height: rowHeight }}>
                  {cellData}
                </TableCell>
              );
            }

            if (columnIndex === 4) {
              return (
                <TableCell
                  className={classes.tableCell}
                  style={{ height: rowHeight }}>
                  {formatDistance(parseISO(cellData), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              );
            }
          }}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          columns={[
            {
              width: (window.innerWidth / 2000) * 250,
              label: 'Project',
              dataKey: 'project',
            },
            {
              width: (window.innerWidth / 2000) * 888,
              label: 'Summary',
              dataKey: 'summary',
            },
            {
              width: (window.innerWidth / 2000) * 375,
              label: 'Tags',
              dataKey: 'tags',
            },
            {
              width: (window.innerWidth / 2000) * 182,
              label: 'Assignee',
              dataKey: 'assignee',
            },
            {
              width: (window.innerWidth / 2000) * 274,
              label: 'Last Updated',
              dataKey: 'lastUpdated',
            },
          ]}
        />
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={this.handleDrawerClose}
          classes={{ paper: classes.drawerPaper }}>
          <Fragment>
            <IconButton
              aria-label="Close Drawer"
              className={classes.drawerCloseButton}
              onClick={this.handleDrawerClose}>
              <CloseIcon />
            </IconButton>
            {drawerItem && (
              <List>
                <ListItem>
                  <ListItemText
                    primary="Summary"
                    secondary={drawerItem.summary.title}
                  />
                </ListItem>
                {drawerItem.description && (
                  <ListItem>
                    <ListItemText
                      primary="Description"
                      secondary={
                        <Linkify
                          properties={{
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          }}>
                          {drawerItem.description}
                        </Linkify>
                      }
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="Are you interested?"
                    secondary={getTaskHelperText(drawerItem)}
                  />
                </ListItem>
              </List>
            )}
          </Fragment>
        </Drawer>
      </Fragment>
    );
  }
}

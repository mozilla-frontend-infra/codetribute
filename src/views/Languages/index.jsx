import { hot } from 'react-hot-loader';
import { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { parse, stringify } from 'qs';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import AppBar from '../../components/AppBar';
import TasksTable from '../../components/TasksTable';

const options = ['Python', 'C++', 'C#'];

@hot(module)
@withStyles(theme => ({
  header: {
    height: 60,
    paddingBottom: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none',
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  container: {
    marginTop: 60,
  },
  title: {
    ...theme.mixins.gutters(),
  },
  button: {
    // background: theme.palette.primary.contrastText,
    color: theme.palette.common.white,
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
}))
export default class Languages extends Component {
  state = {
    anchorEl: null,
  };

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

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setQuery({ lang: event.currentTarget.id });
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const { lang } = this.getQuery();

    return (
      <Fragment>
        <AppBar position="absolute" className={classes.header}>
          <Grid
            container
            className={classes.title}
            alignItems="center"
            justify="space-between"
            spacing={8}>
            <Grid item>
              <Typography
                align="center"
                variant="display1"
                noWrap
                className={classes.link}
                component={Link}
                to="/">
                Codetribute
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                size="large"
                aria-owns={anchorEl ? 'fade-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}>
                {lang || 'Pick languages'}
                <MenuDownIcon />
              </Button>
              <Menu id="fade-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}>
                {options.map(item => (
                  <MenuItem key={item} onClick={this.handleClose} id={item}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </AppBar>
        <div className={classes.container}>
          <TasksTable items={[]} />
        </div>
      </Fragment>
    );
  }
}

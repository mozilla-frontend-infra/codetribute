import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MagnifyIcon from 'mdi-react/MagnifyIcon';

@withStyles((theme) => ({
  root: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    background: theme.palette.common.white,
    borderRadius: 2,
    '&:hover': {
      background: fade(theme.palette.common.white, 0.9),
    },
  },
  search: {
    width: theme.spacing.unit * 6,
    height: '100%',
    paddingTop: 5,
    paddingLeft: 5,
    position: 'absolute',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'text-bottom',
    '& svg': {
      fill: fade(theme.palette.common.black, 0.9),
    },
  },
  input: {
    width: `calc(100% - ${theme.spacing.unit * 6}px)`,
    font: 'inherit',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    border: 0,
    display: 'block',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: fade(theme.palette.common.black, 0.5),
    '&:focus': {
      color: fade(theme.palette.common.black, 0.9),
      outline: 0,
    },
  },
}))
export default class Search extends Component {
  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
  };

  render() {
    const { classes, value, onChange, ...props } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <MagnifyIcon />
        </div>
        <input
          id="adornment-search"
          aria-label="Search Project"
          placeholder="Search Project"
          className={classes.input}
          type="text"
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
}

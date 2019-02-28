import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

@withStyles(
  theme => ({
    cardAction: {
      position: 'absolute',
      bottom: 0,
    },
    fadeout: {
      background: 'linear-gradient(to bottom, transparent 0%, white 42%)',
      right: 0,
      left: 0,
      bottom: 0,
      height: 13 * theme.spacing.unit,
      position: 'absolute',
    },
    card: {
      position: 'relative',
    },
  }),
  { withTheme: true }
)
export default class ErrorPanel extends Component {
  state = { open: false };

  handleButtonClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { classes, children, theme } = this.props;
    const { open } = this.state;
    const collapsedHeight = `${28 * theme.spacing.unit}px`;

    return (
      <Card className={classes.card}>
        <Collapse in={open} collapsedHeight={collapsedHeight}>
          {!open && <div className={classes.fadeout} />}
          <CardContent>
            <Typography>{children}</Typography>
          </CardContent>
          <CardActions
            className={classNames({
              [classes.cardAction]: !open,
            })}>
            <Button size="small" onClick={this.handleButtonClick}>
              {open ? 'See Less' : 'See More'}
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    );
  }
}

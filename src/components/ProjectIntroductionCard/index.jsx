import React, { Component } from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Markdown from 'react-markdown';

export default
@withStyles(
  (theme) => ({
    cardAction: {
      position: 'absolute',
      bottom: 0,
    },
    fadeout: {
      background: 'linear-gradient(to bottom, transparent 0%, white 42%)',
      right: 0,
      left: 0,
      bottom: 0,
      height: theme.spacing(13),
      position: 'absolute',
    },
    card: {
      position: 'relative',
    },
  }),
  { withTheme: true }
)
class ProjectIntroductionCard extends Component {
  state = { open: false };

  handleButtonClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  linkRenderer = (props) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

  render() {
    const { classes, introduction, theme } = this.props;
    const { open } = this.state;
    const collapsedHeight = `${theme.spacing(28)}px`;

    return (
      <Card className={classes.card}>
        <Collapse in={open} collapsedHeight={collapsedHeight}>
          {!open && <div className={classes.fadeout} />}
          <CardContent>
            <Typography component="div" variant="body2">
              <Markdown
                source={introduction}
                renderers={{ link: this.linkRenderer }}
              />
            </Typography>
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
ProjectIntroductionCard.propTypes = {
  introduction: string.isRequired,
};

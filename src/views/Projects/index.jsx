import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsView from './ProjectsView';
import Project from '../Project';

export default class Projects extends Component {
  render() {
    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path}/:projectKey`} component={Project} />
        <Route path={path} exact component={ProjectsView} />
      </Switch>
    );
  }
}

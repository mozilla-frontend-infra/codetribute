import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from './views/Projects';
import Project from './views/Project';

@hot(module)
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/projects/:project" component={Project} />
          <Route exact path="/" component={Projects} />
        </Switch>
      </BrowserRouter>
    );
  }
}

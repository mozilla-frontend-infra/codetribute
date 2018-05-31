import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from './views/Projects';

@hot(module)
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Projects} />
        </Switch>
      </BrowserRouter>
    );
  }
}

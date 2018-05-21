import { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Projects from './views/Projects';
import Bugs from './views/Bugs';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/projects" component={Projects} />
          <Route path="/bugs" component={Bugs} />
          <Redirect from="/" to="/projects" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

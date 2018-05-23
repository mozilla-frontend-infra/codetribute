import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from './views/Projects';
import Bugs from './views/Bugs';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Projects} />
          <Route path="/bugs" component={Bugs} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from './views/Projects';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Projects} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

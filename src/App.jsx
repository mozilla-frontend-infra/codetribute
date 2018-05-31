import { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Projects from './views/Projects';
import Bugs from './views/Bugs';

class App extends Component {
  cache = new InMemoryCache();
  link = new RetryLink().split(
    operation => operation.getContext().link === 'github',
    new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: 'Bearer 2365e5be2b67c4a07335ceafd64273211995c7a2',
      },
    }),
    new HttpLink({ uri: 'http://localhost:3090' })
  );
  apolloClient = new ApolloClient({
    cache: this.cache,
    link: this.link,
  });
  render() {
    return (
      <ApolloProvider client={this.apolloClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/projects" component={Projects} />
            <Route path="/bugs" component={Bugs} />
            <Redirect from="/" to="/projects" />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

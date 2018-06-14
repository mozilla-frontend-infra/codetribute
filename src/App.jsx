import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import storage from 'localforage';
import Projects from './views/Projects';
import Project from './views/Project';

@hot(module)
export default class App extends Component {
  cache = new InMemoryCache();
  persistence = new CachePersistor({
    cache: this.cache,
    storage,
  });
  apolloClient = new ApolloClient({
    cache: this.cache,
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    }),
  });
  render() {
    return (
      <ApolloProvider client={this.apolloClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/projects/:project" component={Project} />
            <Route exact path="/" component={Projects} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

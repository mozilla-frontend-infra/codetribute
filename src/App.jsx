import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import storage from 'localforage';
import Projects from './views/Projects';
import Project from './views/Project';
import theme from './theme';
import FontStager from './components/FontStager';

@hot(module)
@withStyles({
  '@global': {
    a: {
      color: theme.palette.secondary.dark,
    },
  },
})
export default class App extends Component {
  cache = new InMemoryCache();
  persistence = new CachePersistor({
    cache: this.cache,
    storage,
  });
  link = new RetryLink().split(
    operation => operation.getContext().client === 'github',
    new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_API_TOKEN}`,
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
        <MuiThemeProvider theme={theme}>
          <FontStager />
          <CssBaseline />
          <BrowserRouter>
            <Switch>
              <Route path="/projects/:project" component={Project} />
              <Route exact path="/" component={Projects} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

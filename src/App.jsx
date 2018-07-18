import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import storage from 'localforage';
import Projects from './views/Projects';
import Project from './views/Project';
import theme from './theme';
import FontStager from './components/FontStager';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage,
});

@hot(module)
@withStyles({
  '@global': {
    a: {
      color: theme.palette.secondary.dark,
    },
  },
})
export default class App extends Component {
  link = new RetryLink().split(
    operation => operation.getContext().client === 'github',
    new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_API_TOKEN}`,
      },
    }),
    new HttpLink({ uri: process.env.BUGZILLA_ENDPOINT })
  );
  apolloClient = new ApolloClient({
    cache,
    link: this.link,
  });
  render() {
    return (
      <ApolloProvider client={this.apolloClient}>
        <MuiThemeProvider theme={theme}>
          <FontStager />
          <CssBaseline />
          <ApolloConsumer>
            {client => (
              <BrowserRouter>
                <Switch>
                  <Route
                    path="/projects/:project"
                    render={props => <Project client={client} {...props} />}
                  />

                  <Route exact path="/" component={Projects} />
                </Switch>
              </BrowserRouter>
            )}
          </ApolloConsumer>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

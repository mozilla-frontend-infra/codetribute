import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import storage from 'localforage';
import theme from '../theme';
import FontStager from '../components/FontStager/index';
import ErrorPanel from '../components/ErrorPanel/index';
import routes from './routes';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
const cache = new InMemoryCache({ fragmentMatcher });

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
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

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
    const { error } = this.state;

    return (
      <ApolloProvider client={this.apolloClient}>
        <MuiThemeProvider theme={theme}>
          <FontStager />
          {error && <ErrorPanel error={error} />}
          <CssBaseline />
          <BrowserRouter>
            <Switch>
              {routes.map(props => (
                <Route key={props.path} {...props} />
              ))}
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

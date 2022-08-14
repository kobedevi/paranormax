import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContainer from './components/Auth/AuthContainer';
import "./index.css"

import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  HttpLink, 
  from 
} from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(({ graphqlError, networkError}) => {
  if(graphqlError) {
    graphqlError.map(({message, location, path}) => {
      alert(`GraphQL error: ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri:"http://kodev.be/web/api"})
])

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_BEARER}`
    }
  }
});

const client= new ApolloClient ({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <AuthContainer />
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
  credentials: 'same-origin',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client;
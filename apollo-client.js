import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  // uri: 'http://localhost:8000/graphql/',
  uri: process.env.API_URL,
  credentials: 'include',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client;

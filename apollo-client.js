import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'same-origin',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client;

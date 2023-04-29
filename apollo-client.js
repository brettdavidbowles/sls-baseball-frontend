import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    // uri: 'http://localhost:8000/graphql/',
    uri: process.env.API_URL
    // credentials: 'same-origin',
    // headers: {
    //   cookie: req.header('Cookie'),
    // },
    headers: {}
  }),
  cache: new InMemoryCache(),
});

export default client;

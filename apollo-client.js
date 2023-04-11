import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:8000/graphql/',
    // uri: 'http://ec2-18-188-62-39.us-east-2.compute.amazonaws.com/graphql/'
    // credentials: 'same-origin',
    // headers: {
    //   cookie: req.header('Cookie'),
    // },
    headers: {}
  }),
  cache: new InMemoryCache(),
});

export default client;
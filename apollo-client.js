import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// const middleware = new ApolloLink((operation, forward) => {
//   const context = operation.getContext()
//   const sessionId = getSessionId()
//   console.log('sessionId', sessionId)
//   console.log('context', context.req)
//   operation.setContext({
//     // headers,
//   })
//   return forward(operation)
// })

const authLink = setContext((_, { headers }) => {
  console.log('headers', headers)
  return {
    headers: {
      ...headers,
      Cookie: headers?.cookie
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
  credentials: 'same-origin',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache()
})

export default client;
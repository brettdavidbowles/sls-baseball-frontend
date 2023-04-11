import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
  // uri: 'http://ec2-3-129-154-203.us-east-2.compute.amazonaws.com/graphql/',
  credentials: 'include'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

// export default client;

// import {
//   ApolloClient, ApolloLink, HttpLink, InMemoryCache, gql,
// } from '@apollo/client';
// import { NormalizedCacheObject } from '@apollo/client/cache';
// import { GetServerSidePropsContext } from 'next';
// import { useMemo } from 'react';

// const createClient = (ctx?: GetServerSidePropsContext) => {
//   const setCookiesAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
//     ctx?.res.setHeader('set-cookie', operation.getContext().response.headers.raw()['set-cookie'] || '');
//     return response;
//   }));

//   return new ApolloClient({
//     link: setCookiesAfterware.concat(new HttpLink({ uri: 'http://localhost:8000/graphql', headers: { cookie: ctx?.req?.headers?.cookie || '' } })),
//     cache: new InMemoryCache(),
//   });
// };

// let appClient: ApolloClient<NormalizedCacheObject> | undefined;
// const initializeClient = (initialState?: NormalizedCacheObject, ctx?: GetServerSidePropsContext) => {
//   const apolloClient = appClient ?? createClient(ctx);

//   if (initialState) {
//     const prevState = apolloClient.extract();

//     apolloClient.restore({ ...prevState, ...initialState, ...{ ROOT_QUERY: { ...prevState.ROOT_QUERY, ...initialState.ROOT_QUERY } } });
//   }

//   if (typeof window === 'undefined') return apolloClient;

//   appClient ??= apolloClient;

//   return client;
// };

// const useClient = (initialState?: NormalizedCacheObject) => useMemo(() => initializeClient(initialState), [initialState]);
// const client = (ctx: GetServerSidePropsContext) => initializeClient(undefined, ctx);

// export { gql, useClient };
export default client;
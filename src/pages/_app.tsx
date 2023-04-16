import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client"
import client from "apollo-client.js"
import { wrapper } from 'store/store'
import { Provider } from 'react-redux'
import Layout from '@/components/layout'
import { GetLoginState } from "gql/queries/GetLoginState.gql"

interface MyAppProps extends AppProps {
  id: string,
  username: string,
  email: string
}

export default function App({ Component, ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

// export async function getServerSideProps(context: any) {
//   const cookie = context.req.headers.cookie
//   const { data } = await client.query({
//     query: GetLoginState,
//     context: {
//       headers: {
//         cookie: cookie
//       }
//     }
//   })
//   return {
//     props: {
//       id: data?.me?.id || '',
//       username: data?.me?.username || '',
//       email: data?.me?.email || ''
//     }
//   }
// }

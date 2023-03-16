import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client"
import client from "apollo-client.js"
import { wrapper } from 'store/store'
import { Provider } from 'react-redux'
import WindowWatcher from '@/components/WindowWatcher'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <WindowWatcher />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

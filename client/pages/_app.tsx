import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppContextProvider from '../context/AppContext'
import React, { useEffect } from 'react'
import Layout from '../components/layouts/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <React.Fragment>
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  </React.Fragment>

}

export default MyApp

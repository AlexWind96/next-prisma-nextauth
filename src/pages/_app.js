import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { getCookie, setCookies } from 'cookies-next'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'

import '../styles/global.css'

export default function App(props) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState(props.colorScheme)

  const toggleColorScheme = (value) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <SessionProvider session={pageProps?.session}>
              {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = ({ ctx }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
})
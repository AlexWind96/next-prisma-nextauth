import { AppShell } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React from 'react'

import { HomeHeader } from './HomeHeader'

const authLinks = [
  {
    to: '/',
    label: 'Feed',
  },
  {
    to: '/drafts',
    label: 'My drafts',
  },
]

const publicLinks = [
  {
    to: '/',
    label: 'Feed',
  },
]

export function HomeLayout({ children }) {
  const { data: session } = useSession()
  return (
    <AppShell
      padding={'sm'}
      header={<HomeHeader links={session ? authLinks : publicLinks} />}
      // footer={<Footer links={links} />}
      styles={() => ({
        main: {
          minHeight: '100vh',
        },
      })}
    >
      {children}
    </AppShell>
  )
}
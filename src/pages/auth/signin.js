import { AuthLayout } from '@/components/layouts'
import { LoginForm } from '@/features/auth'
import { getProviders, getSession } from 'next-auth/react'
import React from 'react'

export default function SignInPage({ providers }) {
  return <LoginForm providers={providers} />
}

export const getServerSideProps = async (context) => {
  const { req } = context
  const session = await getSession({ req })
  const providers = await getProviders()
  if (session) {
    return {
      redirect: { destination: '/' },
    }
  }
  return {
    props: { providers },
  }
}

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}
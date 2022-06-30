import { AuthLayout } from '@/components/layouts'
import { LoginForm } from '@/features/auth'
import { getSession } from 'next-auth/react'
import React from 'react'

export default function SignInPage() {
  return <LoginForm />
}

export const getServerSideProps = async (context) => {
  const { req } = context
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: { destination: '/' },
    }
  }
  return { props: {} }
}

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout title={'Log in'}>{page}</AuthLayout>
}
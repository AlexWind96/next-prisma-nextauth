import { AuthLayout } from '@/components/layouts'
import { RegisterForm } from '@/features/auth'
import { getProviders, getSession } from 'next-auth/react'
import React from 'react'

export default function NewUserPage({ providers }) {
  return <RegisterForm providers={providers} />
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

NewUserPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}
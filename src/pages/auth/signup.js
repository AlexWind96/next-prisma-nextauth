import { AuthLayout } from '@/components/layouts'
import { RegisterForm } from '@/features/auth'
import React from 'react'


export default function NewUserPage({ providers }) {
  return <RegisterForm providers={providers} />
}

NewUserPage.getLayout = function getLayout(page) {
  return <AuthLayout title={"Sign Up"}>{page}</AuthLayout>
}
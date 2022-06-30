import { yupResolver } from '@hookform/resolvers/yup'
import { Anchor, Button, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
        name: Yup.string().required('This field is required'),
      })
    ),
    mode: 'onChange',
  })
  const router = useRouter()

  async function onSubmit(values) {
    try {
      const body = { ...values }
      const res = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      reset()
      router.push(`signin`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          {...register('name')}
          label="Name"
          placeholder="Name"
          required
          error={errors.name?.message}
        />
        <TextInput
          {...register('email')}
          label="Email"
          placeholder="you@mantine.dev"
          required
          error={errors.email?.message}
        />
        <PasswordInput
          {...register('password')}
          label="Password"
          placeholder="Your password"
          required
          error={errors.password?.message}
        />
      </Stack>
      <Button fullWidth type={'submit'} mt={"md"} loading={isSubmitting}>
        Sign in
      </Button>
      <Text color="dimmed" size="sm" align="center" mt={'sm'}>
        Have an account yet?{' '}
        <Link href={'/auth/signin'}>
          <Anchor size={'sm'} component={'a'}>
            Log in
          </Anchor>
        </Link>
      </Text>
    </form>
  )
}
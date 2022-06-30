import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Anchor,
  Button,
  Divider,
  PasswordInput,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { BrandGithub } from 'tabler-icons-react'
import * as Yup from 'yup'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
      })
    ),
    mode: 'onChange',
  })
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const router = useRouter()

  const handleProviderClick = (provider) => {
    signIn(provider, {
      callbackUrl: '/',
    })
  }

  async function onSubmit(values) {
    try {
      const body = { ...values }
      let res = await signIn('credentials', {
        ...body,
      })
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        variant={dark ? 'white' : 'default'}
        color={'dark'}
        fullWidth
        leftIcon={<BrandGithub size={14} />}
        onClick={() => handleProviderClick('github')}
      >
        Sign in with Github
      </Button>
      <Divider my="md" label="OR" labelPosition="center" />
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
        mt="md"
      />
      {router.query.error && router.query.error === 'CredentialsSignin' && (
        <Alert>Invalid credentials</Alert>
      )}
      <Button fullWidth mt="xl" type={'submit'} disabled={isSubmitting} loading={isSubmitting}>
        Sign in
      </Button>
      <Text color="dimmed" size="sm" align="center" mt={'sm'}>
        Do not have an account yet?{' '}
        <Link href={'signup'}>
          <Anchor size={'sm'} component={'a'}>
            Register new account
          </Anchor>
        </Link>
      </Text>
    </form>
  )
}
import {
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
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { BrandGithub } from 'tabler-icons-react'

export const LoginForm = ({ providers }) => {
  const { register, handleSubmit } = useForm()
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const onSubmit = () => {}

  const handleProviderClick = (providerId) => {
    signIn(providerId)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            variant={dark ? 'white' : 'default'}
            color={'dark'}
            fullWidth
            leftIcon={<BrandGithub size={14} />}
            onClick={() => handleProviderClick(provider.id)}
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
      <Divider my="md" label="OR" labelPosition="center" />
      <TextInput {...register('email')} label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput
        {...register('password')}
        label="Password"
        placeholder="Your password"
        required
        mt="md"
      />
      <Button fullWidth mt="xl" type={'submit'}>
        Sign in
      </Button>
      <Text color="dimmed" size="sm" align="center" mt={'sm'}>
        Do not have an account yet?{' '}
        <Link href={'/auth/new-user'}>
          <Anchor size={'sm'} component={'a'}>
            Register new account
          </Anchor>
        </Link>
      </Text>
    </form>
  )
}
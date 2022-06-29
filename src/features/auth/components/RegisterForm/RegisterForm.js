import { Anchor, Button, Divider, PasswordInput, Text, TextInput } from '@mantine/core'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { BrandGithub } from 'tabler-icons-react'

export const RegisterForm = ({ providers }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            variant="white"
            color={'dark'}
            fullWidth
            leftIcon={<BrandGithub size={14} />}
            onClick={() => signIn(provider.id)}
          >
            Continue with {provider.name}
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
import { Container, Paper, Title } from '@mantine/core'
import * as React from 'react'

export const AuthLayout = ({ children }) => {
  return (
    <Container size={420} my={40}>
      <Title align="center" order={2}>
        LOGO
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {children}
      </Paper>
    </Container>
  )
}
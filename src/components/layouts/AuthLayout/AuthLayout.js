import { Container, Paper, Title } from '@mantine/core'
import * as React from 'react'

export const AuthLayout = ({ children, title }) => {
  return (
    <Container size={420} my={20}>
      <Title align="center" order={2}>
        LOGO
      </Title>
      <Paper withBorder shadow="md" px={30} pb={30} pt={20} mt={30} radius="md">
        <Title align="center" order={3} mb={"md"}>
          {title}
        </Title>
        {children}
      </Paper>
    </Container>
  )
}
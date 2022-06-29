import { ColorSchemeToggle } from '@/components/elements'
import {
  ActionIcon,
  Anchor,
  Burger,
  Button,
  Container,
  Group,
  Header,
  Space,
  Title,
  createStyles,
} from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BrandInstagram, BrandTwitter, BrandYoutube } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}))

export const HomeHeader = ({ links }) => {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const { classes } = useStyles()
  const router = useRouter()
  const isActive = (pathname) => router.pathname === pathname

  const { data: session } = useSession()

  const items = links.map((link) => (
    <Link key={link.label} href={link.to} passHref>
      <Anchor component="a">{link.label}</Anchor>
    </Link>
  ))

  return (
    <Header height={56}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Title order={3}>LOGO</Title>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
          <Space w={'md'} />
          <ColorSchemeToggle />

          <Space w={'md'} />

          {!session && (
            <Link href={'/api/auth/signin'}>
              <Button component="a" disabled={isActive('/signup')}>
                Log in
              </Button>
            </Link>
          )}
          {session && <Button onClick={() => signOut()}>Log out</Button>}
        </Group>
      </Container>
    </Header>
  )
}
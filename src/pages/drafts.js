import { PostCard } from '@/components/elements'
import { HomeLayout } from '@/components/layouts'
import { Button, Grid, Group, SimpleGrid, Tabs, Title } from '@mantine/core'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Plus } from 'tabler-icons-react'


export default function Drafts({ drafts, publishedPosts }) {
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const publishPost = async (id) => {
    try {
      setLoading(true)
      await fetch(`/api/publish/${id}`, {
        method: 'PUT',
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <>
      <Head>
        <title>Drafts | Blog</title>
      </Head>
      <section>
        <Group position={'apart'} mb={'md'}>
          <Title order={3} mb={'md'}>
            My posts
          </Title>
          <Link href={'/create-post'}>
            <Button component="a" color={'green'} leftIcon={<Plus size={14} />}>
              Create new
            </Button>
          </Link>
        </Group>
        <Tabs variant="pills">
          <Tabs.Tab label="Drafts">
            <SimpleGrid cols={3} spacing="xs">
              {drafts.map(({ id, title, content, author }) => (
                <PostCard
                  id={id}
                  key={id}
                  title={title}
                  content={content}
                  authorName={author?.name}
                  onPublish={publishPost}
                  publishLoading={loading}
                />
              ))}
            </SimpleGrid>
          </Tabs.Tab>
          <Tabs.Tab label="Published">
            <Grid>
              {publishedPosts.map(({ id, title, content, author }) => (
                <Grid.Col md={4} key={id}>
                  <PostCard
                    id={id}
                    title={title}
                    content={content}
                    authorName={author?.name}
                    onPublish={publishPost}
                    publishLoading={loading}
                    isPublished
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Tabs.Tab>
        </Tabs>
      </section>
    </>
  )
}

Drafts.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  return {
    props: { drafts: [], publishedPosts: [] },
  }
}
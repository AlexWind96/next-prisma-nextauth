import { CreatePostForm } from '@/components/forms'
import { HomeLayout } from '@/components/layouts'
import { Button, Group, Title } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ArrowNarrowLeft } from 'tabler-icons-react'

export default function CreatePost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (params) => {
    try {
      setLoading(true)
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      setLoading(false)
      await router.push('/drafts')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }
  return (
    <>
      <Head>
        <title>Create post | Blog</title>
      </Head>
      <section>
        <Group position={'left'} mb={'md'} align={'baseline'}>
          <Button
            onClick={() => router.back()}
            leftIcon={<ArrowNarrowLeft size={16} />}
            size={'xs'}
          >
            Back
          </Button>
          <Title order={3}>Create post</Title>
        </Group>

        <CreatePostForm
          onCancel={() => {}}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </section>
    </>
  )
}

CreatePost.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>
}

export async function getStaticProps() {
  return { props: { feed: [] } }
}
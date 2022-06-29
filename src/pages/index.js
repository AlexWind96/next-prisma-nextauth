import { PostCard } from '@/components/elements'
import { HomeLayout } from '@/components/layouts'
import { Grid, Title } from '@mantine/core'
import Head from 'next/head'

async function deletePost(id) {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
}

export default function Index({ feed }) {
  console.log(feed)
  return (
    <>
      <Head>
        <title>Index page | Next.js</title>
      </Head>
      <section>
        <Title order={3} mb={'md'}>
          Feed
        </Title>
        <Grid>
          {feed.map(({ id, title, content, author }) => (
            <Grid.Col key={id} md={4}>
              <PostCard
                id={id}
                title={title}
                content={content}
                authorName={author?.name}
                isPublished
                onDelete={deletePost}
              />
            </Grid.Col>
          ))}
        </Grid>
      </section>
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>
}

export async function getStaticProps() {
  return {
    props: { feed: [{ id: 1, title: 'Title', content: 'Content', author: { name: 'Artur' } }] },
  }
}
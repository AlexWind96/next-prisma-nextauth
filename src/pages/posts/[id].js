import { HomeLayout } from '@/components/layouts'
import { Text } from '@mantine/core'
import Head from 'next/head'

export default function Post(props) {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <Text>{props.title}</Text>
      <Text>{props.content}</Text>
      <Text>{props.author?.name}</Text>
    </>
  )
}

export const getServerSideProps = async () => {
  return {
    props: { title: 'Title', content: 'Content', author: { name: 'Name' } },
  }
}

Post.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>
}
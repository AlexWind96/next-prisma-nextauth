import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core'
import PropTypes from 'prop-types'
import React from 'react'

export const PostCard = ({
  id,
  title,
  content,
  authorName,
  isPublished,
  onPublish,
  publishLoading,
  onDelete,
}) => {
  return (
    <Paper shadow="md" p="md" withBorder>
      <Stack
        justify={'space-between'}
        sx={() => ({
          minHeight: 240,
        })}
      >
        <Title
          sx={(theme) => ({
            color: theme.colors.blue[5],
          })}
          order={5}
        >
          {title}
        </Title>
        <Text lineClamp={4}>
          {/*<Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">*/}
          {content}
          {/*</Spoiler>*/}
        </Text>
        <Text size="sm">{authorName}</Text>
        <Group position="apart">
          {!isPublished && (
            <Button onClick={() => onPublish(id)} loading={publishLoading}>
              Publish
            </Button>
          )}
          <Button onClick={() => onDelete(id)} color={'red'}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}

PostCard.propTypes = {
  id: PropTypes.any,
  authorName: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  isPublished: PropTypes.bool,
  onPublish: PropTypes.func,
  publishLoading: PropTypes.bool,
}
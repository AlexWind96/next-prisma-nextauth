import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Stack, TextInput, Textarea } from '@mantine/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const CreatePostForm = (props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      content: '',
      ...props.initialValues,
    },
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required('This field is required'),
        content: Yup.string().required('This field is required'),
      })
    ),
    mode: 'onChange',
  })

  const onSubmit = (values) => {
    let params = {
      ...values,
    }
    props.onSubmit(params)
  }

  return (
    <>
      {props.error?.message && (
        <Alert title={props.error?.message} color="red">
          Something terrible happened! You made a mistake and there is no going back, your data was
          lost forever!
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput placeholder="Title" label="Title" required {...register('title')} />
          <Textarea
            placeholder="Your comment"
            label="Your comment"
            required
            {...register('content')}
          />
          <Button type={'submit'} loading={props.loading}>
            Create
          </Button>
        </Stack>
      </form>
    </>
  )
}

CreatePostForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}
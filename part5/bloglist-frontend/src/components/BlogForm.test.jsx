import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('<BlogForm /> calls handleNewBlog with correct props', async () => {
  const handleNewBlog = vi.fn()

  render(
    <BlogForm
      handleNewBlog = {handleNewBlog}
    />

  )

  const titleField = screen.getByLabelText('title:')
  const authorField = screen.getByLabelText('author:')
  const urlField = screen.getByLabelText('url:')
  const submitButton = screen.getByText('Add New Blog')

  const user = userEvent.setup()

  await user.type(titleField, 'test title')
  await user.type(authorField, 'test author')
  await user.type(urlField, 'testurl.com')
  await user.click(submitButton)

  const { calls } = handleNewBlog.mock

  expect(calls).toHaveLength(1)
  expect(calls[0][0].title).toBe('test title')
  expect(calls[0][0].author).toBe('test author')
  expect(calls[0][0].url).toBe('testurl.com')
})
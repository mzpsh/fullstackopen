import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

  const handleLike = vi.fn()

  beforeEach(() => {
    render(
      <Blog blog = {{
        title: 'Test Blog Title',
        url: 'test.com',
        author: 'a tester',
        likes: 9
      }}
      handleLike = {handleLike}
      />
    )
  })

  test('render title and author, but not URL or likes', () => {
    screen.getByText('Test Blog Title')
    screen.getByText('a tester')

    const url = screen.getByText('test.com')
    const like = screen.getByText('9')

    expect(url).not.toBeVisible()
    expect(like).not.toBeVisible()

  })

  test('show url and likes when show button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')

    await user.click(button)

    const url = screen.getByText('test.com')
    const like = screen.getByText('9')

    expect(url).toBeVisible()
    expect(like).toBeVisible()
  })

  test('receive two handleLike calls when like button pressed twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    const likeButton = screen.getByText('like')

    await user.click(showButton)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
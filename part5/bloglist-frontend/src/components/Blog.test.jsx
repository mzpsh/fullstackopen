import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {

  beforeEach(() => {
    render(
      <Blog blog = {{
        title: 'Test Blog Title',
        url: 'test.com',
        author: 'a tester',
        likes: 9
      }} />
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
})
import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeletion }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisibility] = useState(false)
  const toggleVisibility = () => setVisibility(!isVisible)

  return <div style = {blogStyle}>
    {blog.title} <button onClick = {toggleVisibility}>{isVisible ? 'hide': 'show'}</button> <br />
    <div style = {{ display: isVisible ? '' : 'none' }}>
      {blog.url} <br />
      {blog.likes} <button onClick = {handleLike}>like</button> <br />
      {blog.author}<br />
      <button onClick = {handleDeletion}>Remove</button>
    </div>
  </div>

}

export default Blog
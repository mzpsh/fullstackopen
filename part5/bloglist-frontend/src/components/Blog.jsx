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
    <div className = 'blog-title'>{blog.title}</div>
    <div className = 'blog-author'>{blog.author}</div>
    <button onClick = {toggleVisibility}>{isVisible ? 'hide' : 'show'}</button> <br />
    <div className = 'blog-details'
      style = {{ display: isVisible ? '' : 'none' }}>
      <div>{blog.url}</div>
      <span>{blog.likes}</span> <button onClick = {handleLike}>like</button> <br />
      <button onClick = {handleDeletion}>Remove</button>
    </div>
  </div>

}

export default Blog
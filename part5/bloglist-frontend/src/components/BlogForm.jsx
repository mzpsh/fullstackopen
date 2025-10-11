import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    handleNewBlog(newBlogObject)
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit = {handleSubmit}>
      <div>
        <label>
          title:
          <input type = "text"
            name = "title"
            value = {newTitle}
            onChange = {(event) => setNewTitle(event.target.value)} />
        </label>
      </div>
      <div>
        <label>
          author:
          <input type = "text"
            name = "author"
            value = {newAuthor}
            onChange = {(event) => setNewAuthor(event.target.value)} />
        </label>
      </div>
      <div>
        <label>
          url:
          <input type = "text"
            name = "url"
            value = {newUrl}
            onChange = {(event) => setNewUrl(event.target.value)} />
        </label>
      </div>
      <button type = "submit">Add New Blog</button>
    </form>
  </div>
}

export default BlogForm
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll() 
    setBlogs(blogs)
  }

  useEffect( () => {
    fetchBlogs()
  }, [])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('handlelogin called');
    console.log(username);
  }

  return (
    user != null
      ? <>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key = {blog.id}
            blog = {blog} />
        )}
      </>
      :
      <form onSubmit = {handleLogin}>
        <div>
          username 
          <input type = "text"
            name = "username"
            value = {username}
            onChange = {(event) => setUsername(event.target.value)}/>
        </div>
        <div>
          password 
          <input type = 'password'
            name = "password"
            value = {password}
            onChange = {(event) => setPassword(event.target.value)}/>
        </div>
        <button type = "submit">Login</button>
      </form>
   
  )
}

export default App
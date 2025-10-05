import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll() 
    setBlogs(blogs)
  }

  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const blogUserJson = window.localStorage.getItem('blogUser')
    if (blogUserJson) {
      setUser(JSON.parse(blogUserJson))
    }
  }

  useEffect( () => {
    fetchUser()
    fetchBlogs()
  }, [])


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('blogUser', JSON.stringify(user))
    } catch (error) {
      alert('Wrong credentials')
    }
  }

  const handleSignOut = () => {
    window.localStorage.clear('blogUser')
    setUser(null)
  }

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return (
    user != null
      ? <>
        <h2>blogs</h2>
        <p>{user['name']} is logged in <button onClick = {handleSignOut}>sign out</button></p>
        <h2>create new</h2>

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
            onChange = {({ target }) => setPassword(target.value)}/>
        </div>
        <button type = "submit">Login</button>
      </form>
   
  )
}

export default App
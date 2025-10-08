import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
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
      const user = JSON.parse(blogUserJson)
      setUser(user)
      blogService.setToken(user.token)
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
      setMessageAndTimeout(`Logged in as ${user.name}`)
    } catch (error) {
      setErrorAndTimeout('Wrong credentials')
    }
  }

  const handleSignOut = () => {
    window.localStorage.clear('blogUser')
    setUser(null)
  }

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {

      const newBlogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }
      const returnedBlog = await blogService.create(newBlogObject)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setBlogs([...blogs, returnedBlog])
      setMessageAndTimeout('New blog added')
    } catch (error) {
      setErrorAndTimeout('Unable to create new blog')
    }
  }

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const setMessageAndTimeout = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const setErrorAndTimeout = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null)
    }, 5000);
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification {...{ message }}/> 
      <Error {...{ error }}/> 
      {
        user != null
          ? <>
         
            <p>{user.name} is logged in <button onClick = {handleSignOut}>sign out</button></p>

            <h2>create new</h2>
            <form onSubmit = {handleNewBlog}>
              <div>
                <label>
                  title: 
                  <input type = "text"
                    name = "title"
                    value = {newTitle}
                    onChange = {(event) => setNewTitle(event.target.value)}/> 
                </label>
              </div>
              <div>
                <label>
                  author: 
                  <input type = "text"
                    name = "author"
                    value = {newAuthor}
                    onChange = {(event) => setNewAuthor(event.target.value)}/> 
                </label>
              </div>
              <div>
                <label>
                  url: 
                  <input type = "text"
                    name = "url"
                    value = {newUrl}
                    onChange = {(event) => setNewUrl(event.target.value)}/> 
                </label>
              </div>
              <button type = "submit">Add New Blog</button>
            </form>

            {blogs.map(blog =>
              <Blog key = {blog.id}
                blog = {blog} />
            )}
          </>
          :
          <form onSubmit = {handleLogin}>
            <div>
              <label>
                username 
                <input type = "text"
                  name = "username"
                  value = {username}
                  onChange = {(event) => setUsername(event.target.value)}/>
              </label>
            </div>
            <div>
              <label>
                password 
                <input type = 'password'
                  name = "password"
                  value = {password}
                  onChange = {({ target }) => setPassword(target.value)}/>
              </label>
            </div>
            <button type = "submit">Login</button>
          </form>
      }
    </>
   
  )
}

export default App
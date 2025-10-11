import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    const newBlogs = await blogService.getAll()
    newBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(newBlogs)
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

  const newBlogFormRef = useRef()

  const handleNewBlog = async (newBlogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs([...blogs, returnedBlog])

      setMessageAndTimeout('New blog added')
    } catch (error) {
      console.log(error)
      setErrorAndTimeout('Unable to create new blog')
    }
  }

  const handleLike = async blog => {
    const likedBlog = {
      ...blog,
      creator: blog.creator.id,
      likes: blog.likes + 1,
    }

    try {
      await blogService.update(likedBlog)
      fetchBlogs()
      setMessageAndTimeout('Like counted')
    } catch (error) {
      console.log(error)
      setErrorAndTimeout('Unable to like')
    }
  }

  const handleDeletion = async blog => {
    if (confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id)
        fetchBlogs()
        setMessageAndTimeout('Blog removed')
      } catch (error) {
        console.log(error)
        setErrorAndTimeout('Unable to remove blog')
      }
    }
  }

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const setMessageAndTimeout = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const setErrorAndTimeout = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification {...{ message }}/>
      <Error {...{ error }}/>
      {
        user !== null
          ? <>

            <p>{user.name} is logged in <button onClick = {handleSignOut}>sign out</button></p>

            <Toggleable buttonLabel = "create new blog"
              ref = {newBlogFormRef}>
              <BlogForm handleNewBlog = {handleNewBlog}/>
            </Toggleable>

            {blogs.sort((a, b) => b.likes > a.likes).map(blog =>
              <Blog key = {blog.id}
                blog = {blog}
                handleLike = {() => handleLike(blog)}
                handleDeletion = {() => handleDeletion(blog)}
              />
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
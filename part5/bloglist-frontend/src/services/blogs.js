import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request

  return response.data
}

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  create,
  update,
  remove
}
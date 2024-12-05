const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs
      .map(e => e['likes'])
      .reduce((prev, current) => prev + current)
    : 0
}

const favoriteBLog = (blogs) => {
  return blogs.length > 0
    ? blogs
      .reduce(
        (prev, current, index)=> current['likes'] > prev['likes'] ? current : prev
      )
    : 0
}

const mostBlogs = (blogs) => {
  const max = _(
    blogs.map(e => e['author'])
  )
    .countBy()
    .toPairs()
    .maxBy(_)
  return {
    author: max[0],
    blogs: max[1]
  }
}

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .toPairs()
    .map((e) => [e[0], e[1].reduce((prev, current) => current['likes'] + prev, 0)])
    .maxBy(([key, value]) => value)

  return {
    author: result[0],
    likes: result[1],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBLog,
  mostBlogs,
  mostLikes
}
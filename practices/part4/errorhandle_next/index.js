const express = require('express')
const privateRouter = express.Router()

const app = express()

app.use((req, res, next) => {
    req.someVariable = "you've been intercepted"
    next()
})

app.use('/private', (req, res, next) => {
    req.someVariable = 'ditto'
    next()
})

privateRouter.get('/hi', (req, res) => {
    res.send(`hi ${req.someVariable}`)
})

privateRouter.get('/hello', (req, res) => {
    res.send(`hello ${req.someVariable}`)
})

app.get('/', (req, res) => {
    res.send(`Hello ${req.someVariable}`);
})

app.use('/private', privateRouter)


app.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => console.log('app started'))
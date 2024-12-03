const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello');
})


app.get('/323', (req, res, next) => {
    // try {
        throw new Error("random error");
    // } catch (error) {
    //     next(error)
    // }
})

app.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => console.log('app started'))
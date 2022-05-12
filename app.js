const express = require('express')
const app = express()
const items = require('./entities/items.js')


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})

app.get('/api/items', (req, res) => {
    res.json(items)
})
app.get('/api/items/:itemId', (req, res) => {
    const id = Number(req.params.itemId)
    const item = items.find(product => item.id === id)
    if (!item) {
        return res.status(404).send('Product not found')
    }
    res.json(item)
})
app.get('/api/query', (req, res) => {
    const name = req.query.name.toLowerCase()
    const item_result = items.filter(item => item.name.toLowerCase().includes(name))

    if (item_result.length < 1) {
        return res.status(200).send('No products matched your search')
    }
    res.json(item_result)
})

const logger = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    console.log(res)
    next()
}

app.use(logger) // execute your middleware for all requests

app.get('/about', (req, res) => {
    return res.send('About Page')
})


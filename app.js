const express = require('express')
const server = require('./server')
const app = express()
const bodyParse = require('body-parser')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

app.use('/game', express.static('public'))

app.use('/game/:productId', (req, res, next) => {
    const id = req.params.productId
    //server.test()
    res.redirect(302, '/game');
    //sketch.test()
})

// Routes which handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error
        }
    })
})

module.exports = app
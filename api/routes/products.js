const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
    //res.status(200).render("index.html")
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /products'
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    /*res.status(200).json({
        message: 'Retrieved product: ' + id
    })*/
    res.status(200).render("../../public/index.html")
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    res.status(201).json({
        message: 'Updated product: ' + id
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: 'Deleted product: ' + id
    })
})

module.exports = router;
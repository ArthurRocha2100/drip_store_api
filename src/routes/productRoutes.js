const express = require('express');
const productController = require('../controller/productController')

const router = express.Router();

router
    .get('/', productController.getAllProducts)
    .get('/:id', productController.getProductById)
    .post('/', productController.createProduct)
    .put('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct)

module.exports = router;
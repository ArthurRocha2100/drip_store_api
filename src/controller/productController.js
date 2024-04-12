const httpStatus = require('http-status');

const mockProducts = [
    {
        id: 1,
        name: 'Tenis'
    },
    {
        id: 2,
        name: 'Tenis'
    }
]

function getAllProducts(req, res) {
    res.send(mockProducts);
}

function getProductById(req, res) {
    res.send(mockProducts.find((product) => product.id == req.params.id));
}

function createProduct(req, res) {
    const newProduct = {
        id: mockProducts.length + 1,
        name: req.body.name,
    }
    mockProducts.push(newProduct);
    res.status(httpStatus.CREATED).send(newProduct);
}

function updateProduct(req, res) {
    const productIndex = mockProducts.findIndex((product) => product.id == req.params.id);

    if (productIndex === -1) {
        res.status(httpStatus.NOT_FOUND).send("Produto não encontrado");
        return;
    }

    const updatedProduct = mockProducts[productIndex];
    updatedProduct.name = req.body.name;
    mockProducts.splice(productIndex, 1, updatedProduct);

    res.send(updatedProduct)
}

function deleteProduct(req, res) {
    const productIndex = mockProducts.findIndex((product) => product.id == req.params.id);

    if (productIndex === -1) {
        res.status(httpStatus.NOT_FOUND).send("Produto não encontrado");
        return;
    }

    mockProducts.splice(productIndex, 1);
    
    res.send("Produto deletado");
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
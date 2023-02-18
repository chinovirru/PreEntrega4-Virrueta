import ProductManager from './ProductManager.js'
import express from 'express'

const getAllProductsController = async (req, resp) => {
    const productManager = new ProductManager('./productosInformatica.json')
    let limits = parseInt(req.query.limits)
    if (isNaN(limits)) {
        limits = 0
    }

    const products = await productManager.getProducts(limits)
    
    return resp.json(products)
}

const getProductByIdController = async (req, resp) => {
    const id = parseInt(req.params.pid)
    if (isNaN(id) || (id < 1)) {
        return resp.json("El Id debe ser un numero mayor que 0")
    }

    const productManager = new ProductManager('./productosInformatica.json')
    const product = await productManager.getProductById(id)

    console.log(product)

    return resp.json(product)

}

const app = express()

app.get('/products', getAllProductsController)
app.get('/products/:pid', getProductByIdController)

const puerto = 9090
app.listen(puerto, () => {
    console.log("Express connected")
})
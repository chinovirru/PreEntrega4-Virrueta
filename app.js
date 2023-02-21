import ProductManager from './src/ProductManager.js'
import express from 'express'
import productsRoutes from './src/routes/products.route.js'
import cartsRoutes from './src/routes/carts.route.js'

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

app.use(express.json())

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)

const puerto = 9090
app.listen(puerto, () => {
    console.log("Express connected")
})
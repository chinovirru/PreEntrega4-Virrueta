import { Router } from 'express'
import ProductManager from '../ProductManager.js';

const router = Router();

router.get('/', async(req, res) => {
    const productManager = new ProductManager('./src/data/products.json')
    let limits = parseInt(req.query.limits)
    if (isNaN(limits)) {
        limits = 0
    }

    const products = await productManager.getProducts(limits)
    
    return res.json(products)
})

router.get('/:pid', async(req, res) => {
    const id = parseInt(req.params.pid)
    if (isNaN(id) || (id < 1)) {
        return res.status(404).json({"Error": "El Id debe ser un numero ó mayor que 0"})
    }

    const productManager = new ProductManager('./src/data/products.json')
    const product = await productManager.getProductById(id)

    return res.json(product)
})

router.post('/', async(req, res)=> {
    if (!req.body.title) {
        return res.json({'Error': 'Falta el atributo title'})
    }
    if (!req.body.description) {
        return res.json({'Error': 'Falta el atributo description'})
    }
    if (!req.body.code) {
        return res.json({'Error': 'Falta el atributo code'})
    }
    if (!req.body.price) {
        return res.json({'Error': 'Falta el atributo price'})
    }
    if (!req.body.status || req.body.status !== true) {
        return res.json({'Error': 'Falta el atributo status o tiene que ser TRUE'})
    }
    if (!req.body.stock) {
        return res.json({'Error': 'Falta el atributo stock'})
    }
    if (!req.body.category) {
        return res.json({'Error': 'Falta el atributo category'})
    }

    const productManager = new ProductManager('./src/data/products.json')
    try {
        const product = await productManager.addProduct(
            req.body.title,
            req.body.description,
            req.body.code,
            req.body.price,
            req.body.status,
            req.body.stock,
            req.body.category,
            req.body.thumbnail)
        
        return res.status(201).json(product)
    
    } catch (error) {
        return res.status(404).json({"Error": error.message})
    }
})

router.put('/:pid', async(req, res) => {
    const id = parseInt(req.params.pid)
    if (isNaN(id) || (id < 1)) {
        return res.status(404).json({"Error": "El Id debe ser un numero ó mayor que 0"})
    }
    const productManager = new ProductManager('./src/data/products.json')
    try {
        const updatedProduct = productManager.updateProduct(
            req.params.pid,
            req.body.title,
            req.body.description,
            req.body.code,
            req.body.price,
            req.body.status,
            req.body.stock,
            req.body.category,
            req.body.thumbnail)
        
        return res.status(202).json({updatedProduct})
    } catch(error) {
        return res.status(404).json({"Error": error.message})
    }
})

router.delete('/:pid', async(req, res) => {
    const productManager = new ProductManager('./src/data/products.json')
    const id = parseInt(req.params.pid)
    if (isNaN(id) || (id < 1)) {
        return res.status(404).json({"Error": "El Id debe ser un numero ó mayor que 0"})
    }
    try {
        productManager.removeProduct(id)
        return res.status(200).json({"Mensaje": "Producto Eliminado"})
        
    } catch (error) {
        return res.status(404).json({"Error": error.message})
    }    
})

export default router
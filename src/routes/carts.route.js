import { Router } from 'express'
import CartManager from '../managers/CartManager.js'

const router = Router()

router.post('/', async(req, res) => {
    const cartManager = new CartManager('./src/data/cart.json')
    try {
        const cart = await cartManager.addCart(req.body)
        return res.status(201).json(cart)
    } catch (error) {
        return res.status(404).json({"Error": error.message})
    }
})

router.get('/:cid', async(req, res) => {
    const id = parseInt(req.params.cid)
    if (isNaN(id) || (id < 1)) {
        return res.status(404).json({"Error": "El Id debe ser un numero ó mayor que 0"})
    }
    const cartManager = new CartManager('./src/data/cart.json')
    try {
        const cart = await cartManager.getCartById(id)
        return res.status(200).json(cart)        
    } catch (error) {
        return res.status(404).json({"Error":error.message})
    }

})

router.post('/:cid/products/:pid', async(req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    if (isNaN(cartId) || (cartId < 1)) {
        return res.status(404).json({"Error": "El Id del Cart debe ser un numero ó mayor que 0"})
    }
    if (isNaN(productId) || (productId < 1)) {
        return res.status(404).json({"Error": "El Id del Product debe ser un numero ó mayor que 0"})
    }

    const cartManager = new CartManager('./src/data/cart.json')
    try {
        const cart = await cartManager.addProductToCart(cartId, productId)
        return res.status(201).json(cart)
    } catch (error) {
        return res.status(404).json({"Error": error.message})
        
    }
})

export default router
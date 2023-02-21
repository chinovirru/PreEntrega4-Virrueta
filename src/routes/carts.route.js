import { Router } from 'express'
import CartManager from '../entities/CartManager.js'

const router = Router()

router.post('/', async(req, res) => {
    return res.json({"mensaje": "Post"})
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
    return res.json({"mensaje": "Get Product of Cart"})
})

export default router
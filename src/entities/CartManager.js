import {readFile, writeFile} from 'fs/promises'
import { generateId } from '../utils/utils.js'
import Cart from './Cart.js'
import ProductCart from './ProductCart.js'

class CartManager {
    path

    constructor(path) {
        this.path = path
    }

    async getCartById(id) {
        const carts = JSON.parse(await readFile(this.path, 'utf-8'))
        const cart = carts.find(cart => cart.id === id)
        if (cart) {
            return cart
        } else {
            throw new Error("No existe carrito con ese id")
        }
    }

    async addProductToCart(cid, productId) {
        const carts = JSON.parse(await readFile(this.path, 'utf-8'))
        const indexProduct = carts[cid].products.findIndex(product => product.product === productId)
        if (indexProduct !== -1) {
            carts[cid].products[indexProduct].quantity++
        } else {
            carts[cid].products.push(new ProductCart(productId,1))
        }

        await writeFile(this.path, JSON.stringify(carts))

        return carts[cid]
    }

    async addCart() {
        const carts = JSON.parse(await readFile(this.path, 'utf-8'))
        const cart = new Cart(generateId(carts), [])
        carts.push(cart)
        await writeFile(this.path, JSON.stringify(carts))

        return cart
    }
}

export default CartManager
import {readFile, writeFile} from 'fs/promises'
import { generateId } from '../utils/utils.js'
import Cart from '../entities/Cart.js'
import ProductCart from '../entities/ProductCart.js'

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
        const products = JSON.parse(await readFile('./src/data/products.json', 'utf-8'))
        if (carts.findIndex(cart => cart.id === cid) === -1) {
            throw new Error("No existe el id del cart")
        }

        if (products.findIndex(product => product.id === productId) === -1) {
            throw new Error("No existe el id del producto")
        }

        const indexCart = carts.findIndex(cart => cart.id === cid)

        const indexProduct = carts[indexCart].products.findIndex(product => product.product === productId)
        if (indexProduct !== -1) {
            carts[indexCart].products[indexProduct].quantity++
        } else {
            carts[indexCart].products.push(new ProductCart(productId,1))
        }

        await writeFile(this.path, JSON.stringify(carts))

        return carts[indexCart]
    }

    async addCart({products = []}) {
        const carts = JSON.parse(await readFile(this.path, 'utf-8'))
        const cart = new Cart(generateId(carts), products)
        carts.push(cart)
        await writeFile(this.path, JSON.stringify(carts))

        return cart
    }
}

export default CartManager
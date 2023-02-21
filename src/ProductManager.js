import {access, readFile, writeFile} from 'fs/promises'
import Product from './Product.js'

class ProductManager {
    path

    constructor(path) {
        this.path = path
    }

    async checkFile() {
        try {
            await access(this.path)
        }
        catch {
            console.log("No existe")
            await writeFile(this.path, '[]')
        }
    }

    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        const searchProduct = products.find(product => product.code === code)
        if (searchProduct) {
            throw new Error("El Producto ingresado ya existe en el listado")
        } else {
            const product = new Product(this.generateId(products), title, description, code, price, status, stock, category, thumbnail)
            products.push(product)
            await writeFile(this.path, JSON.stringify(products))
            
            return product
        }
    }

    async getProducts(limits) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        if (limits === 0) {
            return products
        }

        return products.slice(0,limits)
    }

    async getProductById(id) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        const item = products.find(product => product.id === id)
        if (item) {
            return item
        } else {
            return "not found"
        }
    }

    generateId(list) {
        if (list.length === 0) {
            return 1
        }

        let id = Math.max(...list.map(item => item.id))
        return id+1
    }

    async updateProduct(id, title, description, code, price, status, stock, category, thumbnail) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        const index = products.findIndex(product => product.id === id)
        if (index !== -1) {
            products[index].title = title
            products[index].description = description
            products[index].code = code
            products[index].price = price
            products[index].status = status
            products[index].stock = stock
            products[index].category = category
            products[index].thumbnail = thumbnail
           
            await writeFile(this.path, JSON.stringify(products))

            return products[index]
        } else {
            throw new Error('No existe producto con el id indicado')
        }
    }

    async removeProduct(id) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        if (products.findIndex(product => product.id === id) !== -1) {
            const notRemovedProducts = products.filter(product => product.id !== id)
            
            await writeFile(this.path, JSON.stringify(notRemovedProducts))
        } else {
            throw new Error('No existe Producto con el id ingresado')
        }
    }
}

export default ProductManager
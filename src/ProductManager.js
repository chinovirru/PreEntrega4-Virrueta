import {access, readFile, writeFile} from 'fs/promises'
import Product from './Product.js'

class ProductManager {
    path

    constructor(path) {
        this.path = path
        // this.checkFile()
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

    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        const searchProduct = products.find(product => product.code === code)
        if (searchProduct) {
            console.log("El Producto ingresado ya existe en el listado")
        } else {
            const product = new Product(this.generateId(products), title, description, price, thumbnail, code, stock)
            products.push(product)
            await writeFile(this.path, JSON.stringify(products))
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

    async updateProduct(id, title, description, price, thumbnail, code, stock) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        const index = products.findIndex(product => product.id === id)
        if (index !== -1) {
            products[index].title = title
            products[index].description = description
            products[index].price = price
            products[index].thumbnail = thumbnail
            products[index].code = code
            products[index].stock = stock
            
            await writeFile(this.path, JSON.stringify(products))
        } else {
            console.log('No existe producto con el id indicado')
        }
    }

    async removeProduct(id) {
        const products = JSON.parse(await readFile(this.path, 'utf-8'))
        if (products.findIndex(product => product.id === id) !== -1) {
            const removedProducts = products.filter(product => product.id !== id)
            await writeFile(this.path, JSON.stringify(removedProducts))
        } else {
            console.log('No existe Producto con el id ingresado')
        }
    }
}

export default ProductManager

// class Product {
//     id
//     title
//     description
//     price
//     thumbnail
//     code
//     stock

//     constructor(id, title, description, price, thumbnail, code, stock) {
//         this.id = id
//         this.title = title
//         this.description = description
//         this.price = price
//         this.thumbnail = thumbnail
//         this.code = code
//         this.stock = stock
//     }
// }

// const main = async () => {
//     controladorDeProductos = new ProductManager('./productosInformatica.json')
//     await controladorDeProductos.checkFile()
//     console.log("Se muestra estado inicial")
//     await controladorDeProductos.getProducts()
//     console.log("Comienza carga de productos...")
//     await controladorDeProductos.addProduct('Mouse','Mouse de 4000 dpi ideal gamer',25000,'./img/mouse.jpg',0120230130,10)
//     await controladorDeProductos.addProduct('Teclado','Teclado inalambrico iluminacion RGB',20000,'./img/teclado.jpg',0220230130,5)
//     await controladorDeProductos.addProduct('Gabinete','Gabinete lateral transparente con Cooler',15000,'./img/gabinete.jpg',0320230130,20)
//     await controladorDeProductos.addProduct('Monitor','Monitor led 22pulgadas IPS',55000,'./img/monitor.jpg',0420230130,5)
//     await controladorDeProductos.addProduct('WebCam','Camara web de 1080fpm',8000,'./img/webcam.jpg',0520230130,4)
//     await controladorDeProductos.addProduct('Wifi','Placa wifi USB',10000,'./img/wifi.jpg',0620230130,5)
//     console.log("")
//     console.log("Se intenta agregar un producto que con el code existente")
//     await controladorDeProductos.addProduct('WebCam','Camara web de 1080fpm',8000,'./img/webcam.jpg',0520230130,4)
//     console.log("")
//     console.log("Se muestran todos los productos")
//     await controladorDeProductos.getProducts()
//     console.log("")
//     console.log("Se muestra producto por id")
//     await controladorDeProductos.getProductById(5)
//     console.log("")
//     console.log("Se muestra error al buscar id no existente")
//     await controladorDeProductos.getProductById(100)
//     console.log("Se actualiza un producto")
//     await controladorDeProductos.updateProduct(5,'Camara Web','Camara web de 1080 fps',7000,'./img/webcam.jpg', 0620230131,8)
//     console.log("")
//     console.log("Se elimina un producto")
//     await controladorDeProductos.removeProduct(3)
//     console.log("")
//     console.log("Se muestra nuevamente le listado para observar como quedo")
//     await controladorDeProductos.getProducts()
// }

//main()
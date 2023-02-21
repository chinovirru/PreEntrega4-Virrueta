class Product {
    id
    title
    description
    code
    price
    status
    stock
    category
    thumbnail

    constructor(id, title, description, code, price, status, stock, category, thumbnail=[]) {
        if (!id) throw new Error('Falta id para el producto')
        if (!title) throw new Error('Falta title para el producto')
        if (!description) throw new Error('Falta description para el producto')
        if (!code) throw new Error('Falta code para el producto')
        if (!price) throw new Error('Falta rpice para el producto')
        if (!status) throw new Error('Falta status para el producto')
        if (!stock) throw new Error('Falta stock para el producto')
        if (!category) throw new Error('Falta category para el producto')

        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }
}

export default Product
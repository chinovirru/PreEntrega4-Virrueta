import express from 'express'
import productsRoutes from './src/routes/products.route.js'
import cartsRoutes from './src/routes/carts.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)

const puerto = 9090
app.listen(puerto, () => {
    console.log("Express connected")
})
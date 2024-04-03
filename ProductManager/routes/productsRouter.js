import { Router } from "express";
// import { ProductManager } from '../config/ProductManager.js'
// ya no se consulta el productManager, se consulta productModel
import productModel from "../models/product.js";

// ya no depende esta ruta './src/data/products.json', osea el TXT con los productos a consultar
// const productManager = new ProductManager('./src/data/products.json')
const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        // ya no se consulta con get, y aca devuelve la coleccion de productos 
        const prods = await productModel.find()
        // const prods = await productManager.getProducts()
        let limite = parseInt(limit)
        if (!limite)
            limite = prods.length
        const prodsLimit = prods.slice(0, limite)
        res.status(200).render('templates/home', {
            mostrarProductos: true,
            productos: prodsLimit,
            css: 'product.css'
        })

    } catch (error) {
        res.status(500).render('templates/error', {
            error: error,
        })
    }
})

//: significa que es modificable (puede ser un 4 como un 10 como un 75)
productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid //Todo dato que se consulta desde un parametro es un string
        // de igual modo ya no se usa el get, y aca devuelve el producto buscado
        const prod = await productModel.findById(idProducto)
        // const prod = await productManager.getProductById(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body
        console.log(product)
        // sin el get, y aca devuelve el producto creado
        const mensaje = await productModel.create(product)
        // const mensaje = await productManager.addProduct(product)
        if (mensaje == "Producto cargado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(400).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProduct = req.body
        // sin el get, y aca devuelve el producto actualizado
        const mensaje = await productModel.findByIdAndUpdate(idProducto,updateProduct)
        // const mensaje = await productManager.updateProduct(idProducto, updateProduct)
        if (mensaje == "Producto actualizado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        // sin el get, y aca devuelve el producto eliminado
        const mensaje = await productModel.findByIdAndDelete(idProducto)
        // const mensaje = await productManager.deleteProduct(idProducto)
        if (mensaje == "Producto eliminado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
})

export default productsRouter
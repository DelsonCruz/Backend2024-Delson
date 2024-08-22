import { Router } from "express";
import productModel from "../models/product.js";

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit, page, filter, sort } = req.query

        const paginado = page != undefined ? page : 1;
        const limitante = limit != undefined ? limit :10;
        const ordenar = sort == 'asc' ? sort : 'desc';
        const prods = await productModel.find()
        
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


productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid //Todo dato que se consulta desde un parametro es un string
        
        const prod = await productModel.findById(idProducto)
        
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

export default productsRouter;

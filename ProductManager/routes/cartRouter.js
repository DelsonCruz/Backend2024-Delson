import { Router } from "express";
import cartModel from "../models/cart.js";
import { addLogger } from "./loggerRouter.js";

const cartRouter = Router()
// app.use(addLogger)

cartRouter.post('/', async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (e) {
        req.logger.error(`Error interno del servidor al crear carrito: ${e}`)
        res.status(500).send(e)
    }
})



cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        res.status(200).send(cart)
    } catch (e) {
        req.logger.error(`Error interno del servidor al crear carrito: ${e}`)
        res.status(500).send(e)
    }
})

cartRouter.post('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body
        const cart = await cartModel.findById(cartId)

        const indice = cart.products.findIndex(product => product.id_prod == productId)

        if (indice != -1) {
            //Consultar Stock para ver cantidades
            cart.products[indice].quantity = quantity //5 + 5 = 10, asigno 10 a quantity
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity })
        }
        const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
        res.status(200).send(mensaje)
    } catch (e) {
        req.logger.error(`Error interno del servidor al crear producto: ${e}`)
        res.status(500).send(e)
    }
})


cartRouter.delete('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        // const { quantity } = req.body
        
        const mensaje = await cartModel.findByIdAndDelete(cartId)

        
        if (mensaje == "Producto eliminado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al eliminar elemento: ${e}`)
        req.logger.error(`Error interno del servidor al crear producto: ${e}`)
        res.status(500).send(e)
    }
})




cartRouter.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.pid
        const updateCart = req.body
        const mensaje = await cartModel.findByIdAndUpdate(cartId,updateCart)
        
        if (mensaje == "Producto actualizado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

cartRouter.put('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const updateCart = req.params.pid
        const { quantity } = req.body
        const cart = await cartModel.findById(cartId)

        const indice = cart.products.findIndex(product => product.id_prod == updateCart)

        if (indice != -1) {
            //Consultar Stock para ver cantidades
            cart.products[indice].quantity = quantity //5 + 5 = 10, asigno 10 a quantity
        } else {
            cart.products.push({ id_prod: cartId, quantity: quantity })
        }
        const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
        res.status(200).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al crear producto: ${e}`)
    }
})

export default cartRouter

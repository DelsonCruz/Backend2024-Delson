import { Router } from "express";
import cartModel from "../models/cart.js";
// import messageModel from "../models/messages";
// import { CartManager } from "../config/CartManager.js";
// const cartManager = new CartManager('./src/data/cart.json')


// import { Router } from "express";
// import cartModel from "../models/cart.js";

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al crear carrito: ${error}`)
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
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
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

export default cartRouter




/*
const cartRouter = Router()

 
// cartRouter.post('/:pid', async (req, res) => {
    cartRouter.post('cid/:pid', async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
            const cart = await cartModel.findById(cartId)
    
            const indice = cart.products.findIndex(product => product.id == productId)
    
            if (indice != -1){
                cart[indice].quantity += quantity
            }else{
                cart.products.push({id: productId, quantity: quantity})
            }
            
            // actualizar el arreglo
    
            const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
    
            // const mensaje = await cartManager.addProductByCart(productId, quantity)
            res.status(200).send(mensaje)
        } catch (error) {
            res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
        }
    })

    cartRouter.get('/:id', async (req, res) => {
// cartRouter.get('/', async (req, res) => {
    try {
        
        const cartId = req.params.id
        const cart = await cartModel.findById(cartId)

        // const cart = await cartManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

 */

// export default cartRouter
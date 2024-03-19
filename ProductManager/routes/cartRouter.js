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



// Ruta para eliminar un producto específico de un carrito
router.delete('/cartRouter/:cid/productos/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        // Filtrar y eliminar el producto del carrito
        cart.productos = cart.productos.filter(producto => producto._id.toString() !== pid);

        await cart.save();

        res.status(200).json({ message: "Producto eliminado del carrito exitosamente" });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


export default cartRouter

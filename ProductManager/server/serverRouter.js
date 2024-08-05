
import express from 'express'
import mongoose from 'mongoose'
import productsRouter from './routes/products.router.js'
import cors from 'cors'

// const whiteList = ['http://127.0.0.1:5500']



const app = express()
const PORT = 8000

//Permitir todas las rutas de ejecucion
// app.use(cors())

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    // si alguno de los 'methods' se quita, debe mostrar error
    methods: ['GET', 'POST', 'UPDATE', 'DELETE']
}

app.use(cors(corsOptions))

app.use('/api/products', productsRouter)

mongoose.connect('mongodb+srv://delsong91:Cruzmongo92+@cluster0.covmyfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB is connected"))
    .catch((e) => console.log(e))

// app.use('/api/products', productsRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`) 
})

export default serverRouter
import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import userRouter from './routes/userRouter.js'
import chatRouter from './routes/chatRouter.js'
import upload from './config/multer.js'
// se importa mongoose para poder realizar la consulta del carro y los productos en la BD
import mongoose from 'mongoose'
import messageModel from './models/messages.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'

//Configuraciones o declaraciones
const app = express()
const PORT = 8000

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

// conexion a la base de datos
// delsong91:<password> = contraseña del servidor
// mongodb+srv://delsong91:<password>@cluster0.covmyfh.mongodb.net/

// mongoose.connect("mongodb+srv://delsong91:@cluster0.by94px6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

mongoose.connect("mongodb+srv://delsong91:@cluster0.covmyfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")



// cuando envie la informacion enviar mensaje que el servidor si conecto
.then(() => console.log("DB esta online"))
// 
.catch(e => console.log(e))

//Middlewares
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


// const mensajes = []
io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")

    // devuelve todos los mensajes que emita la base de datos del carrito
    // incluso los que muestren error de acuerdo al modelo
    socket.on('mensaje', async (mensaje) => {
    // socket.on('mensaje', async (info) => {
    // console.log(info)
    // mensajes.push(info)
    
        try{
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        }catch(e){
            io.emit('mensajeLogs', e)
            //aca se envia cualquier mensaje, teniendo en cuenta que
            // se debe enviar asi exista un error
        }
        
    })

})

//Routes
app.use('/public', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter, express.static(__dirname + '/public'))
app.use('/api/cart', cartRouter)
app.use('/api/chat', chatRouter, express.static(__dirname + '/public'))
app.use('/api/users', userRouter)

app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (e) {
        res.status(500).send("Error al cargar imagen")
    }
})

import express from 'express'
import upload from './config/multer.js'
import mongoose from 'mongoose'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexRouter.js'
import cookieParser from 'cookie-parser'
import loginRouter from './routes/loginRouter.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'

//Configuraciones o declaraciones
const app = express();
const PORT = 8000;

//Login
loginRouter.listen(PORT, () => {
    console.log(`Login on port ${PORT}`)
});

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)


mongoose.connect("mongodb+srv://delsong91:<password>@cluster0.covmyfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


.then(() => console.log("DB esta online"))
.catch(e => console.log(e))

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use('/', indexRouter);

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


// app.get('/getCookie', (req,res) => {
//     res.cookie
// })


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Aquí deberías verificar si el usuario y la contraseña son válidos
    if (username === 'usuario' && password === 'contraseña') {
        // Si la autenticación es exitosa, redirige a la página de inicio o a la página deseada
        res.redirect('/home.handlebars');
    } else {
        // Si la autenticación falla, muestra un mensaje de error o redirige de vuelta al formulario de login
        res.render('login', { error: 'Usuarios o contraseña inválidas' });
    }
});





io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")

  
    socket.on('mensaje', async (mensaje) => {
  
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



app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (e) {
        res.status(500).send("Error al cargar imagen")
    }
})

import express from 'express'
import upload from './config/multer.js'
import mongoose from 'mongoose'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexRouter.js'
import whiteList from './server/serverRouter.js'
import cookieParser from 'cookie-parser'
import loginRouter from './routes/loginRouter.js'
import { Server } from 'socket.io'
import { addLogger} from './routes/loggerRouter.js'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
// import { configDotenv } from 'dotenv'
// import { MongoTailableCursorError } from 'mongodb'
import config from './config.js'
import dotenv from 'dotenv'
import { fork } from 'child_process'


//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

loginRouter.listen(PORT, () => {
    console.log(`Login on port ${PORT}`)
});

const io = new Server(server)

// Conexion con DataBase
mongoose.connect("mongodb+srv://delsong91:<password>@cluster0.covmyfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

.then(() => console.log("DB esta online"))
.catch(e => console.log(e))

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use('/', indexRouter);
app.use('/', whiteList);
app.use(express.urlencoded({ extended: true }));
app.use(addLogger)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(cookieParser(process.env.COOKIES_SECRET))


app.use(session({
    secret: "coderSecret",
    resave: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://delsong91:<password>@cluster0.covmyfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 60 * 60
    }),
    saveUnitialized: true
}))




// Variables de entorno

dotenv.config();


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        ttl: 60 * 60
    }),
    saveUnitialized: true
}))

app.get('/suma', (req, res) => {

    const child = fork ('./operaciones.js')
    console.log(process.pid)
    child.send("A trabajar")
    child.on('message', resultado =>{

        res.send (`El resultado final es: ${resultado}`)
    })

  
})


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


// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
    res.render('register');
});

// Ruta para manejar el envío del formulario de registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Aquí creas el usuario en tu base de datos o en cualquier otra fuente de datos
    
    if (username === 'usuario' && password === 'contraseña') {
        // Si la autenticación es exitosa, redirige a la página de inicio o a la página deseada
        res.redirect('/home.handlebars');
    }else {
    res.redirect('/login'); // Redirigir al usuario al formulario de login despues de validar usuario
        }
});

// Ruta para la página de inicio (home)
app.get('/home', (req, res) => {
    // Renderizar la página home
    res.render('home');
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


// Mailing

const transport = nodemailer.createTransport({
    service: 'gmail',
    // el puerto de servicio 485 tambien se puede 
    // usar(pero usualmente se bloquea para usuarios estandar)
    port: 587,
    auth:{
        user: "nak.rock2@gmail.com",
        pass: "fpog vbtm xcsx abtl"
    }

});


app.get ('/mail', async (req, res) => {

        const mail = await transport.sendMail({
            from: 'Test coder<mail@mail.com>',
            to: "mail@mail.com",
            subject: "Correo test",
            html: `
                <div>
                <h1>
                holA, bienvenido a nuestra APP
                </h1>
                </div>
                    `,
            attachments:[]
            // para adjuntar archivos debe subirlo al repository (recomendado)
            attachments:[{
            // filename: 'imagen.jpg(archivo.pdf)',
            filename: 'billing.pdf',
            path: _dirname+ 'https://github.com/DelsonCruz/Backend2024-Delson/blob/main/ProductManager/public/files/billing.pdf',
            // ID(alias) que debe tener el archivo
            // cid: 'billing'
            // }]

            // billing.pdf
        })
        console.log(mail)
        res.status(200).send("Mail enviado")
}) 








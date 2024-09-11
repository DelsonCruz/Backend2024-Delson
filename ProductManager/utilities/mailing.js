import express from 'express'
import nodemailer from 'nodemailer'
// import { __dirname } from './path.js';


const app = express();
const PORT = 8004;

app.listen (PORT, ()=>{
    console.log(`Server Mail on port ${PORT}`)
})

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
            from: 'Test coder<nak.rock2@gmail.com>',
            to: "nak.rock2@gmail.com",
            subject: "Correo test",
            html: `
                <div>
                <h1>
                holA
                </h1>
                </div>
                    `,
            attachments:[]
            // para adjuntar archivos debe subirlo al repository (recomendado)
            // attachments:[{
            // filename: 'imagen.jpg(archivo.pdf)',
            // path: _dirname+ '/ruta/imagen.jpg',
            // ID(alias) que debe tener el archivo
            // cid: 'imagen'
            // }]
        })
        console.log(mail)
        res.status(200).send("Mail enviado")
}) 

export default transport;
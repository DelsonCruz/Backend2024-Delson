// chatServer.js
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Router } from "express";

const chatRouter = Router()
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const PORT = process.env.PORT || 3001;

app.use(express);

chatRouter.get('/', (req, res) => {

    


// Configurar la conexión de socket.io
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Escuchar mensajes de los clientes
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        // Reenviar el mensaje a todos los clientes conectados
        io.emit('chat message', msg);
    });

    // Manejar la desconexión de un cliente
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    req.logger.info(`Chat server running on port ${PORT}`);
})
})



export default chatRouter







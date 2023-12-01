import express from 'express'
import http from "http"
import { Server as SocketServer } from "socket.io"


const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})


io.on("connection", (socket) => {
    console.log(`a user connected `)

    socket.on('message', (body) => {
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
         
        })
    })

    // Escuchar el evento de desconexión del cliente
    socket.on('disconnect', () => {
        // Mostrar un mensaje en la consola cuando se desconecta un cliente
        console.log('Un cliente se ha desconectado');
    });


})

server.listen(5000)
console.log("server on port", 5000)
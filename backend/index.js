const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const Message = require('./message');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.get("/", (req, res) => {
    res.send("El servidor del chat está corriendo");
});

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    Message.findAll({ order: [['timestamp', 'ASC']], limit: 100 })
        .then(messages => {
            socket.emit('previousMessages', messages);
        })
        .catch(err => console.error(err));

    socket.on('message', (data) => {
        Message.create(data)
            .then(() => {
                io.emit('message', data);
            })
            .catch(err => console.error(err));

    });

    socket.on('disconnect', () => {
        console.log('cliente desconectado');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`));

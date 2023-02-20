const express = require('express');
const mongoose = require('mongoose');
const { Chat } = require('../config/mongoconf');
const ChatManager = require('../daos/chat/ChatDaoMongo');
const { ContenedorMongoDb } = require('../contenedores/mongoContain');
const {startSocketServer, getIo } =require("../public/scripts/chat")
const router = express.Router();
const chatManager = new ChatManager();

router.get('/', async (req, res) => {
try {
    const messages = await Chat.find().sort({ fechaYHora: 'asc' });

res.render('chat', { messages });
} catch (error) {
console.error(error);
res.status(500).send('Error en el servidor');
}
});

router.post('/', async (req, res) => {
try {
    const { email, tipo, cuerpo } = req.body;
    const fechaYHora = new Date();

    const message = new Chat({ email, tipo, fechaYHora, cuerpo });
    const nuevoMensaje = await Chat.create({ correo, tipo, fechaYHora, cuerpo });

    const io = getIo();
    io.emit('recibir mensaje', message);

    res.status(201).send('Mensaje guardado correctamente');
} catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
}
});

module.exports = router;
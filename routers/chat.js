const express = require('express');
const ChatManager = require('../daos/chat/chat');
const {Chat} = require('../config/mongoconf');
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const mongoose = require('mongoose');

const router = express.Router();
const chatManager = new ChatManager();


router.get('/', async (req, res) => {
try {
    const messages = await Chat.find().lean();
    res.render('chat', { messages });
} catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
}
});

router.post('/', async (req, res) => {
try {
    const { email, tipo, body } = req.body;
    const fechaYHora = new Date();

    const message = new Chat({ email, tipo, fechaYHora, cuerpo: body });
    await message.save();

    req.app.io.emit('recibir mensaje', message);

    res.redirect('/chat');
} catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
}
});

module.exports = router;


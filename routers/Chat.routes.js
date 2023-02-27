const express = require('express');
const mongoose = require('mongoose');
const { Chat } = require('../config/mongoconf');
const ChatManager = require('../daos/chat/ChatDaoMongo');
const { ContenedorMongoDb } = require('../contenedores/mongoContain');
const { getIo } = require("../public/scripts/chat");

const router = express.Router();
const chatManager = new ChatManager();

router.get('/', async (req, res) => {
  try {
    const messages = await Chat.find().sort({ fechaYHora: 'asc' }).lean();
    res.render('chat', { messages });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const messages = await Chat.find({ correo: email }).sort({ fechaYHora: 'asc' }).lean();
    res.render('chat', { messages });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

router.post('/', async (req, res) => {
  try {
    const { correo, tipo, cuerpo } = req.body;
    const fechaYHora = new Date();

    const message = new Chat({ correo, tipo, fechaYHora, cuerpo });
    const nuevoMensaje = await Chat.create({ correo, tipo, fechaYHora, cuerpo });

    const io = getIo();
    if (io) {
      io.emit('recibir mensaje', message);
    }
    res.redirect("/chat")    
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


module.exports = router;

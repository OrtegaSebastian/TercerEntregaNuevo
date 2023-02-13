const express = require('express');
const {Chat} = require('../config/mongoconf')

const router = express.Router();

const chat = new Chat(router);

router.get('/chat', (req, res) => {
  res.render('chat');
});

module.exports = router;
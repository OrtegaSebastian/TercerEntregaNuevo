const socketio = require('socket.io');

class Chat {
  constructor(server) {
    this.io = socketio(server);
    this.listen();
  }

  listen() {
this.io.on('connection', (socket) => {
    console.log(`Un usuario se ha conectado con ID de socket: ${socket.id}`);

    // Escuchar cuando un usuario envía un mensaje
    socket.on('enviar mensaje', (message) => {
    console.log(`Mensaje recibido: ${message}`);

    // Emitir el mensaje a todos los clientes conectados
    this.io.emit('recibir mensaje', message);
    });

    // Escuchar cuando un usuario se desconecta
    socket.on('disconnect', () => {
    console.log(`Un usuario se ha desconectado con ID de socket: ${socket.id}`);
    });
});

socket.on('enviar mensaje', (message) => {
    console.log(`Mensaje recibido: ${message.body}`);

    const fechaYHora = new Date();
    const mensaje = {
    email: message.email,
    tipo: message.tipo,
    fechaYHora: fechaYHora.toLocaleString(),
    cuerpo: message.body
    };

    // Emitir el mensaje a todos los clientes conectados
    this.io.emit('recibir mensaje', mensaje);
    });
  }
}

module.exports = Chat;
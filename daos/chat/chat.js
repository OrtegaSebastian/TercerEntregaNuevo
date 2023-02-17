const Chat = require('../../config/mongoconf');
const { Server } = require('socket.io');

class ChatManager {
  constructor(server) {
    this.io = new Server(server);

    this.io.on('connection', (socket) => {
      console.log(`Un usuario se ha conectado con ID de socket: ${socket.id}`);

      // Escuchar cuando un usuario envía un mensaje
      socket.on('enviar mensaje', async (message) => {
        console.log(`Mensaje recibido: ${message}`);

        // Guardar el mensaje en la base de datos usando el modelo Chat
        const nuevoMensaje = new Chat({
          email: message.email,
          tipo: message.tipo,
          fechaYHora: new Date(),
          cuerpo: message.body
        });

        await nuevoMensaje.save();

        // Emitir el mensaje a todos los clientes conectados
        this.io.emit('recibir mensaje', message);
      });

      // Escuchar cuando un usuario se desconecta
      socket.on('disconnect', () => {
        console.log(`Un usuario se ha desconectado con ID de socket: ${socket.id}`);
      });
    });
  }
}

module.exports = ChatManager;
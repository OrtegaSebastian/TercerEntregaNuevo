const socketIo = require('socket.io')
const {
    Chat
} = require('../../config/mongoconf')

let io

function startSocketServer(server) {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log(`Client connected with ID ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Client disconnected with ID ${socket.id}`);
        });
    });

    io.on('connection', async (socket) => {
        try {
            const messages = await Chat.find().sort({
                fechaYHora: 'asc'
            });

            io.emit('load messages', messages);
        } catch (error) {
            console.error(error)
        }

        socket.on('send message', async (message) => {
            try {
                const {
                    email,
                    tipo,
                    cuerpo
                } = message;
                const fechaYHora = new Date();

                const nuevoMensaje = await Chat.create({
                    email,
                    tipo,
                    fechaYHora,
                    cuerpo
                });
                const mensajeGuardado = await nuevoMensaje.save();

                io.emit('receive message', mensajeGuardado);
            } catch (error) {
                console.error(error);
            }
        });
    });
}
function enviarMensaje(event) {
    const nombre = document.getElementById("email-input").value;
    const msj = document.getElementById("cuerpo-input").value;
    const tipo = document.getElementById("tipo-input").value;
    document.getElementById("cuerpo-input").value = "";
    socket.emit("new_msg", { email: nombre, cuerpo: msj, tipo: tipo });
    document.getElementById("sent-message").innerHTML = msj;
    document.getElementById("sent-message").style.display = "block";
    setTimeout(function () {
      document.getElementById("sent-message").style.display = "none";
    }, 3000);
    return false;
  }
function getIo() {
    return io;
}

module.exports = {
    startSocketServer,
    getIo,enviarMensaje
};
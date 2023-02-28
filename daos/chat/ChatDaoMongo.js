
const { ContenedorMongoDb } = require("../../contenedores/mongoContain");

class ChatMongoDB extends ContenedorMongoDb {
  constructor() {
    super("Chat", {
      correo: String,
      tipo: String,
      fechaYHora: Date,
      cuerpo: String
    });
  }
}

module.exports = ChatMongoDB;
const { ContenedorMongoDb } = require("../../contenedores/mongoContain");
const mongoose = require('mongoose');

class ChatMongoDB extends ContenedorMongoDb {
  constructor() {
    super("Chat", {
      correo: String,
      tipo: String,
      fechaYHora: Date,
      cuerpo: String
    });

    // Configuración para conexión local
    const urlLocal = 'mongodb://localhost:27017/sesiones';
    mongoose.connect(urlLocal, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then(() => {
      console.log('Conexión a MongoDB local establecida correctamente');
    }).catch((err) => {
      console.log(`Error en la conexión a MongoDB local: ${err}`);
    });

    // Configuración para conexión en Atlas
    const urlAtlas = 'mongodb+srv://sebasindahouse:Mosi0310@cluster0.epscnqt.mongodb.net/sesiones';
    mongoose.connect(urlAtlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then(() => {
      console.log('Conexión a MongoDB Atlas establecida correctamente');
    }).catch((err) => {
      console.log(`Error en la conexión a MongoDB Atlas: ${err}`);
    });
  }
}

module.exports = ChatMongoDB;




// const { ContenedorMongoDb } = require("../../contenedores/mongoContain");

// class ChatMongoDB extends ContenedorMongoDb {
//   constructor() {
//     super("Chat", {
//       correo: String,
//       tipo: String,
//       fechaYHora: Date,
//       cuerpo: String
//     });
//   }
// }

// module.exports = ChatMongoDB;
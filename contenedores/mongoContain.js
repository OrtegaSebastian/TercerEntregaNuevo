const mongoose = require("mongoose");
const logger = require('../config/log4js')



function conectarDB(url, cb) {
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if(!err) {
    baseDeDatosConectada = true;
    }
    if(cb != null) {
    cb(err);
    }
});
}

class ContenedorMongoDb {
  constructor(coleccion, esquema) {
    this.col = mongoose.model(coleccion, esquema);
  }

  async traerTodos() {
    try {
      const objets = await this.col.find();
      return objets;
    } catch (err) {
      logger.error(`Error en Ruta Get: ${err}`);
    }
  }

  async traerPorId(id) {
    try {
      const objets = await this.col.findOne({ _id: id });
      return objets;
    } catch (err) {
      logger.error(`Error en Ruta get by Id: ${err}`);
    }
  }

  async guardar(objet) {
    try {
      await this.col.create(objet);
      const newId = await this.col
        .find({}, { _id: 1 })
        .sort({ _id: -1 })
        .limit(1);
      return newId;
    } catch (err) {
      logger.error(`Error en Ruta post: ${err}`);
    }
  }

  async cambiarPorId(elem) {
    const { id } = elem;
    try {
      const encontrado = await this.col.find({ _id: id });

      if (!encontrado) {
        encontrado = null;
      } else {
        await this.col.replaceOne({ _id: id }, elem);
      }
      return encontrado;
    } catch (err) {
      logger.error(`Error en Ruta change by ID: ${err}`);
    }
  }

  async borrarPorId(id) {
    let encontrado = await this.col.find({ _id: id });
    try {
      if (!encontrado) {
        encontrado = null;
      } else {
        await this.col.deleteOne({ _id: id });
      }
      return encontrado;
    } catch (err) {
      logger.error(`Error en Ruta delete by Id: ${err}`);
    }
  }
}
module.exports = {
conectarDB,ContenedorMongoDb
}






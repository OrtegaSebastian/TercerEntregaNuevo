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
    let modelo = mongoose.models[coleccion];
    if (!modelo) {
      modelo = mongoose.model(coleccion, esquema);
    }
    this.col = modelo;
  }


  async traerTodos() {
    try {
      const objects = await this.col.find();
      return objects;
    } catch (err) {
      logger.error(`Error en Ruta Get: ${err}`);
      return err;
    }
  }

  async traerPorId(id) {
    try {
      const objects = await this.col.findOne({ _id: id });
      return objects;
    } catch (err) {
      logger.error(`Error en Ruta get by Id: ${err}`);
      return err;
    }
  }

  async guardar(object) {
    try {
      const nuevo = await this.col.create(object);
      return nuevo;
    } catch (err) {
      logger.error(`Error en Ruta post: ${err}`);
      return err;
    }
  }

  async cambiarPorId(elem) {
    const { id } = elem;
    try {
      const encontrado = await this.col.find({ _id: id });

      if (!encontrado) {
        return { error: "No se encontró el objeto a cambiar" };
      } else {
        await this.col.replaceOne({ _id: id }, elem);
        return encontrado;
      }
    } catch (err) {
      logger.error(`Error en Ruta change by ID: ${err}`);
      return err;
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






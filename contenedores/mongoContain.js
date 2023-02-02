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







// class contenedorCarritoMongo {
//   // * get, post, put, delete
//   // * CRUD
//   constructor(collecionCarrito, esquema) {
//     this.db = mongoose.model(collecionCarrito, esquema);
//   }
//   async saveCarrito(newDoc) {
//     try {
//       const doc = await this.db.create(newDoc);
//       return doc;
//     } catch (e) {
//       throw new Error("carrito no encontrado", e);
//     }
//   }
//   async getAllCarritos() {
//     try {
//       const data = await this.db.find({});
//       return data;
//     } catch (e) {
//       throw new Error("no se encontro carrito", e);
//     }
//   }

//   async getbyCarritoId(id) {
//     try {
//       const data = await this.db.findOne({ _id: id });
//       return data;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }

//   // * PUT
//   async updateCarrito(elem) {
//     try {
//       this.db.replaceOne({ _id: elem._id }, elem);
//       return elem;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async borrarCarrito(id) {
//     try {
//       await this.db.deleteOne({ _id: id });
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async borrarTodosCarrito() {
//     await this.db.deleteMany({});
//   }
// }
// class contenedorProductosMongo {
//   // * get, post, put, delete
//   // * CRUD
//   constructor(collecionCarrito, esquema) {
//     this.db = mongoose.model(collecionCarrito, esquema);
//   }
//   async saveProd(newDoc) {
//     try {
//       const doc = await this.db.create(newDoc);
//       return doc;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async getAllproductos() {
//     try {
//       const data = await this.db.find({});
//       return data;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }

//   async getbyProdId(id) {
//     try {
//       const data = await this.db.findOne({ _id: id });
//       return data;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }

//   // * PUT
//   async updateProducto(elem) {
//     try {
//       this.db.replaceOne({ _id: elem._id }, elem);
//       return elem;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async borrarProducto(id) {
//     try {
//       await this.db.deleteOne({ _id: id });
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async borrarTodosProductos() {
//     await this.db.deleteMany({});
//   }
// }

// class contenedorUsuariosMongo {
//   // * get, post, put, delete
//   // * CRUD
//   constructor(Users, esquema) {
//     this.db = mongoose.model(Users, esquema);
//   }
//   async createUser(newDoc) {
//     try {
//       const doc = await this.db.create(newDoc);
//       return doc;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//   async saveUser(newDoc) {
//     try {
//       const doc = await this.db.save(newDoc);
//       return doc;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
  
//   async getbyUserId(id) {
//     try {
//       const data = await this.db.findOne({ id: id });
//       return data;
//     } catch (e) {
//       throw new Error(e);
//     }
//   }  


// }


// module.exports = { contenedorCarritoMongo, contenedorProductosMongo,contenedorUsuariosMongo };



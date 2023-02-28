const { ContenedorMongoDb } = require("../../contenedores/mongoContain");
const { Schema } = require("mongoose");
const logger = require("../../config/log4js");

const ProductoSchema = new Schema({
  id_prod: { type: String, required: true },
  timestamp: { type: Date, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  imgUrl: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String, required: true },
});

const CarritoSchema = new Schema({
  timestamp: { type: Date, required: true },
  id_user: { type: String, required: true },
  estado: { type: String, enum: ["activo", "completado"] },
  productos: { type: [ProductoSchema], default: [] },
});

class CarritoDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", CarritoSchema);
  }

  async guardaProductos(productos, id_carrito) {
    try {
      await this.col.updateOne(
        { _id: id_carrito },
        { $set: { productos: productos } }
      );
    } catch (err) {
      logger.error(`Error en Api Carritos: ${err}`);
    }
  }

  async borrarProdporId(id, id_prod) {
    try {
      await this.col.updateOne(
        { _id: id },
        { $pull: { productos: { id_prod: id_prod } } }
      );
    } catch (err) {
      logger.error(`Error en Api Carritos: ${err}`);
    }
  }

  async getCarritoByUsuario(id) {
    try {
      const objets = await this.col.findOne({
        $and: [{ id_user: id }, { finCompra: false }],
      });
      return objets;
    } catch (err) {
      logger.error(`Error en Api Carritos: ${err}`);
    }
  }
  
  async getCarritoByIdLocal(id) {
    try {
      const objets = await this.col.findOne({ _id: id });
      return objets;
    } catch (err) {
      logger.error(`Error en Api Carritos: ${err}`);
    }
  }

}

module.exports = CarritoDaoMongoDb;



// const { ContenedorMongoDb } = require("../../contenedores/mongoContain");
// const { Schema } = require("mongoose");
// const logger = require("../../config/log4js");

// const ProductoSchema = new Schema({
//   id_prod: { type: String, required: true },
//   timestamp: { type: Date, required: true },
//   nombre: { type: String, required: true },
//   descripcion: { type: String, required: true },
//   codigo: { type: String, required: true },
//   imgUrl: { type: String, required: true },
//   precio: { type: Number, required: true },
//   cantidad: { type: Number, required: true },
//   categoria: { type: String, required: true },
// });

// const CarritoSchema = new Schema({
//   timestamp: { type: Date, required: true },
//   id_user: { type: String, required: true },
//   estado: { type: String, enum: ["activo", "completado"] },
//   productos: { type: [ProductoSchema], default: [] },
// });

// class CarritoDaoMongoDb extends ContenedorMongoDb {
//   constructor() {
//     super("carritos", CarritoSchema);
//   }

//   async guardaProductos(productos, id_carrito) {
//     try {
//       await this.col.updateOne(
//         { _id: id_carrito },
//         { $set: { productos: productos } }
//       );
//     } catch (err) {
//       logger.error(`Error en Api Carritos: ${err}`);
//     }
//   }

//   async borrarProdporId(id, id_prod) {
//     try {
//       await this.col.updateOne(
//         { _id: id },
//         { $pull: { productos: { id_prod: id_prod } } }
//       );
//     } catch (err) {
//       logger.error(`Error en Api Carritos: ${err}`);
//     }
//   }

//   async getCarritoByUsuario(id) {
//     try {
//       const objets = await this.col.findOne({
//         $and: [{ id_user: id }, { finCompra: false }],
//       });
//       return objets;
//     } catch (err) {
//       logger.error(`Error en Api Carritos: ${err}`);
//     }
//   }
// }

// module.exports = CarritoDaoMongoDb;










const { ContenedorMongoDb } = require("../../contenedores/mongoContain");
const {Schema} = require('mongoose')
const logger = require('../../config/log4js')

const productos = new Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});


class CarritoDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", {
      timestamp: { type: Date, required: true },
      id_user: { type: String, required: true },
      finCompra: { type: Boolean, default: false },
      productos: [productos],
    });
  }

  async saveProducts(
    id,
    id_prod,
    timestamp,
    nombre,
    descripcion,
    codigo,
    thumbnail,
    precio,
    stock
  ) {
    try {
      const newProduct = {
        id_prod,
        timestamp,
        nombre,
        descripcion,
        codigo,
        thumbnail,
        precio,
        stock,
      };
      await this.col.findByIdAndUpdate(
        { _id: id },
        { $push: { productos: newProduct } }
      );
    } catch (err) {
      logger.error(`Error en Api Carritos: ${err}`);
    }
  }

  async deleteProdById(id, id_prod) {
    try {
      await this.col.updateOne(
        { _id: id },
        { $pull: { products: { _id: id_prod } } }
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
}

module.exports = CarritoDaoMongoDb;








// class DAOcarroMongo extends contenedorCarritoMongo {
//   constructor() {
//     // *super = padre/mongocarrito
//     super("collecionCarrito", {
//       nombre: { type: String, required: true },
//       descripcion: { type: String, required: true },
//       codigo: { type: String, required: true },
//       foto: { type: String, required: true },
//       precio: { type: Number, required: true },
//       // TODO: revisar mongoose doc, para cambiar el timestamp
//       //   TODO: timestamp: true,
//     });
//   }
// }

// module.exports = DAOcarroMongo;


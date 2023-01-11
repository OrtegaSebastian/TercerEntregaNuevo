const { contenedorProductosMongo } = require("../../contenedores/mongoContain");

class DAOProdMongo extends contenedorProductosMongo {
  constructor() {
    // *super = padre/mongoProducto
    super("collectionProducto", {
      id: { type: String, require: true },
      nombre: { type: String, require: true },
      descripcion: { type: Number, require: true },
      codigo: { type: String, require: true },
      foto: { type: String, require: true },
      precio: { type: Number, require: true },
      stock: { type: Number, require: true },
      // TODO: revisar mongoose doc, para cambiar el timestamp
      //   TODO: timestamp: true,
    });
  }
}


module.exports = DAOProdMongo;

const  {contenedorProductosMongo}  = require("../../contenedores/mongoContain");

class DAOProdMongo extends contenedorProductosMongo {
  constructor() {
    // *super = padre/mongoProducto
    super("productos", {
      timestamp: { type: Date, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: String, required: true },
      thumbnail: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true }, 
    });
  }
}


module.exports = DAOProdMongo;

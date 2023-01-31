const  {ContenedorMongoDb}  = require("../../contenedores/mongoContain");

class DAOProdMongo extends ContenedorMongoDb {
  constructor() {
    // *super = padre/mongoProducto
    super("productos", {
      timestamp: { type: Date, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      thumbnail: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true }, 
    });
  }
}


module.exports = DAOProdMongo;

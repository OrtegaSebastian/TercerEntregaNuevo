const  {ContenedorMongoDb}  = require("../../contenedores/mongoContain");

class DAOProdMongo extends ContenedorMongoDb {
  constructor() {
    // *super = padre/mongoProducto
    super("productos", {
      timestamp: { type: Date, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      imgUrl: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true }, 
      categoria: { type: String, required: true },      
    });
  }
  
}
/*
      "nombre":"prod1" ,
      "descripcion": "desc1",
      "codigo":"123asd",
      "imgUrl2":"notengo",
      "precio":"1000",
      "stock": "200" 
*/

module.exports = DAOProdMongo;

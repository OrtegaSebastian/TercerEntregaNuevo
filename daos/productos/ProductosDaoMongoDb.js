const  {ContenedorMongoDb}  = require("../../contenedores/mongoContain");
const mongoose = require('mongoose');

class DAOProdMongo extends ContenedorMongoDb {
  constructor() {  
    super("productos", {
      timestamp: { type: Date, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      imgUrl: { type: String, required: true },
      precio: { type: Number, required: true },
      cantidad: { type: Number, required: true }, 
      categoria: { type: String, required: true },      
    });
  }
  
}


module.exports = DAOProdMongo;

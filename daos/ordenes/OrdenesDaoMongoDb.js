const  {ContenedorMongoDb}  = require("../../contenedores/mongoContain");
const mongoose = require('mongoose');

class DAOOrdenesMongo extends ContenedorMongoDb {
  constructor() {
    super("Orden",
      {
        id_usuario: { type: String, required: true },
        id_carrito: { type: mongoose.Schema.Types.ObjectId, ref: "Carrito", required: true },
        productos: [
          {
            id_prod: { type: String, required: true },
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            imgUrl: { type: String, required: true },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true },
            categoria: { type: String, required: true },
          },
        ],
        totalCompra: { type: Number, required: true },
        direccion: { type: Object, required: true },
        estado: { type: String, default: "pendiente" },
        timestamp: { type: Date, default: Date.now }
      }
    );
  }
}


module.exports = DAOOrdenesMongo;
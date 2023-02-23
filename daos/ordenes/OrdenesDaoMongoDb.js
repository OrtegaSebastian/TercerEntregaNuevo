const  {ContenedorMongoDb}  = require("../../contenedores/mongoContain");

class DAOOrdenesMongo extends ContenedorMongoDb {
  constructor() {    
    super("Orden", 
    {userId: String,
          productos: [
      {
        productosId: {
          type: String,
        },
        cantidad: {
          type: Number,
          default: 1,
        },
        categoria: {
          type: String,          
        },
      },
    ],
    totalCompra: { type: Number, required: true },
    direccion: { type: Object, required: true },
    estado: { type: String, default: "pendiente" },
  },
  { timestamp: Date 
    });
  }
  
}

module.exports = DAOOrdenesMongo;
const  {ContenedorMongoDb}  = require("../../contenedores/mongoContain");

class DAOOrdenesMongo extends ContenedorMongoDb {
  constructor() {    
    super("Orden", {

    });
  }
  
}


module.exports = DAOOrdenesMongo;
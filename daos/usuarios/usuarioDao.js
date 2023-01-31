const { ContenedorMongoDb } = require("../../contenedores/mongoContain");
const mongoose = require ('mongoose')


class usuariosDAODb extends ContenedorMongoDb {
    constructor() {
    // *super 
    super("Users", {
    username: { type: String, required: true },
    password:{ type: String, required: true },
    nombre: { type: String, required: true },
    edad:{ type: Number, required: true },
    lastName: { type: String, required: true },
    uploaded_file:{ type: String, required: true },
    correo: { type: String, required: true },
    },);
    
}
}
module.exports = usuariosDAODb



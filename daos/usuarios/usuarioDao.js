const { contenedorUsuariosMongo } = require("../../contenedores/mongoContain");
const mongoose = require ('mongoose')


class usuariosDAODb extends contenedorUsuariosMongo {
    constructor() {
    // *super 
    super("Users", {
    username: { type: String, required: true },
    password:{ type: String, required: true },
    firstName: { type: String, required: true },
    age:{ type: Number, required: true },
    lastName: { type: String, required: true },
    uploaded_file:{ type: String, required: true },
    email: { type: String, required: true },
    },);
    
}
}
module.exports = usuariosDAODb



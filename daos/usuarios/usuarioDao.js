const { contenedorUsuariosMongo } = require("../../contenedores/mongoContain");

class DAOUserMongo extends contenedorUsuariosMongo {
    constructor() {
    // *super = padre/mongocarrito
    super("Users", {
    username: String,
    password: String,
    firstName: String,
    age:Number,        
    lastName: String,
    uploaded_file:String,
    email: String
    });
}
}

module.exports = DAOUserMongo;

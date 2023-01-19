let carritosDao;
let productosDao;
let usuariosDAO;
// TODO: PERS no es mongodb, por lo tanto no regresa nada
switch (process.env.PERS) {
  case "mongoDB":
  default:

    const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb");

    const CarritosDaoMongoDb = require("./carritos/CarritosDaoMongo");

    const DAOUserMongo = require("./usuarios/usuarioDao.js")

    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    usuariosDAO = new DAOUserMongo();
    break;
}


module.exports = { productosDao, carritosDao,usuariosDAO };

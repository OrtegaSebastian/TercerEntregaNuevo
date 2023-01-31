let CarritoDaoMongoDb = require('./carritos/CarritosDaoMongo')
let DAOProdMongo = require('./productos/ProductosDaoMongoDb')
let usuariosDAODb = require("./usuarios/usuarioDao")

const dotenv = require('dotenv')
dotenv.config()

const TIPO = process.env.TIPO;

let ProductosDao;
let CarritosDao;
let usuariosDAO;

switch (TIPO) {
  
  case "archivos":
    ProductosDao = new DAOProdMongo();
    CarritosDao = new CarritoDaoMongoDb();
    usuariosDAO= new usuariosDAODb();

    break;
  case "mongodb":
    ProductosDao = new DAOProdMongo();
    CarritosDao = new CarritoDaoMongoDb();
    usuariosDAO = new usuariosDAODb()
    break;

}

module.exports = {ProductosDao,CarritosDao, usuariosDAO}


// let carritosDao;
// let productosDao;
// let usuariosDAO;
// // TODO: PERS no es mongodb, por lo tanto no regresa nada
// switch (process.env.PERS) {
//   case "mongoDB":
//   default:

//     const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb");

//     const CarritosDaoMongoDb = require("./carritos/CarritosDaoMongo");

//     const DAOUserMongo = require("./usuarios/usuarioDao.js")

//     productosDao = new ProductosDaoMongoDb();
//     carritosDao = new CarritosDaoMongoDb();
//     usuariosDAO = new DAOUserMongo();
//     break;
// }


// module.exports = { productosDao, carritosDao,usuariosDAO };
let CarritoDaoMongoDb = require('./carritos/CarritosDaoMongo')
let DAOProdMongo = require('./productos/ProductosDaoMongoDb')
let usuariosDAODb = require("./usuarios/usuarioDao")
let ChatMongoDB = require("./chat/ChatDaoMongo")
let DAOOrdenesMongo = require('./ordenes/OrdenesDaoMongoDb')

const dotenv = require('dotenv')
dotenv.config()

const TIPO = process.env.TIPO;

let ProductosDao;
let CarritosDao;
let usuariosDAO;
let ChatMongoDAO
let ordenesDAO;

switch (TIPO) {
  
  case "archivos":
    ProductosDao = new DAOProdMongo();
    CarritosDao = new CarritoDaoMongoDb();
    usuariosDAO= new usuariosDAODb();
    ordenesDAO= new DAOOrdenesMongo();
    

    break;
  case "mongodb":
    ProductosDao = new DAOProdMongo();
    CarritosDao = new CarritoDaoMongoDb();
    usuariosDAO = new usuariosDAODb()
    ChatMongoDAO = new ChatMongoDB()
    ordenesDAO= new DAOOrdenesMongo();
    
    break;

}

module.exports = {ProductosDao,CarritosDao, usuariosDAO,ChatMongoDAO,ordenesDAO}


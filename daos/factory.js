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
  
  case "local":
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/local-db';
    ProductosDao = new DAOProdMongo();
    CarritosDao = new CarritoDaoMongoDb();
    usuariosDAO = new usuariosDAODb()
    ChatMongoDAO = new ChatMongoDB()
    ordenesDAO = new DAOOrdenesMongo();
    break;
 
  case "mongodb":
    ProductosDao = new DAOProdMongo();
    CarritosDao = new CarritoDaoMongoDb();
    usuariosDAO = new usuariosDAODb()
    ChatMongoDAO = new ChatMongoDB()
    ordenesDAO = new DAOOrdenesMongo();
    
    break;
    default:
      console.log(`Tipo de base de datos desconocido: ${TIPO}`);
      process.exit(1);
  
}

module.exports = {ProductosDao,CarritosDao, usuariosDAO,ChatMongoDAO,ordenesDAO}


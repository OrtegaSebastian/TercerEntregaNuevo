let CarritoDaoMongoDb = require('./carritos/CarritosDaoMongo')
let DAOProdMongo = require('./productos/ProductosDaoMongoDb')
let usuariosDAODb = require("./usuarios/usuarioDao")
let ChatManager = require("./chat/chat")

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
    ChatManager = new usuariosDAODb()
    break;

}

module.exports = {ProductosDao,CarritosDao, usuariosDAO}


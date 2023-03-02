// Importamos mongoose
const mongoose = require("mongoose")

// Importamos dotenv para manejar las variables de entorno
const dotenv = require('dotenv')
dotenv.config();

// Obtenemos las variables de entorno para conectar a la base de datos
const db_user = process.env.DB_USER_MONGO;
const db_pass = process.env.DB_PASS_MONGO;
const db_name = process.env.DB_NAME_MONGO;

// Función para conectarse a la base de datos
function DBConnect(cb) {
  mongoose.connect(
    `mongodb+srv://${db_user}:${db_pass}@cluster0.epscnqt.mongodb.net/${db_name}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    (err) => {
      console.log("conectados!");
      if (err) {
        console.log(err);
      }
      cb();
    }
  );
}


// Creamos el modelo de usuarios
const Users = mongoose.model("users", {
username: String,
password: String,
nombre: String,
apellido:String,
correo:String,
direccion: String,
edad: String,
imgUrl: String,
telefono: String,
});

// Creamos el modelo de productos
const Productos = mongoose.model("productos", {
timestamp:Date,
nombre: String,
descripcion: String,
codigo:String,
imgUrl: String,
precio: String,
categoria: String,
});

// Creamos el esquema para los productos en el carrito
const ProductoSchema = new mongoose.Schema({
timestamp: Date,
nombre: String,
descripcion: String,
codigo: String,
imgUrl: String,
precio: String,
cantidad: String,
categoria:String
});

// Creamos el modelo de carrito
const Carrito = mongoose.model("Carrito", {
id_user: String,
estado: { type: String, enum: ["activo", "completado"] },
productos: [ProductoSchema],
timestamp: { type: Date, default: Date.now },
});

// Creamos el modelo de orden
const Orden = mongoose.model("Orden",{
  id_usuario: { type: String, required: true },
  id_carrito: { type: mongoose.Schema.Types.ObjectId, ref: "Carrito", required: true },
  productos: [
    {
      id_prod: { type: String, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true },
      imgUrl: { type: String, required: true },
      precio: { type: Number, required: true },
      cantidad: { type: Number, required: true },
      categoria: { type: String, required: true },
    },
  ],
  totalCompra: { type: Number, required: true },
  direccion: { type: Object, required: true },
  estado: { type: String, default: "pendiente" },
  timestamp: { type: Date, default: Date.now },
});

// Creamos el modelo de chat
const Chat = mongoose.model("Chat", {
correo: String,
tipo: String,
fechaYHora: Date,
cuerpo: String
});

// Exportamos todos los modelos y la función de conexión
module.exports={Users,Productos,Carrito,Chat,Orden,DBConnect}
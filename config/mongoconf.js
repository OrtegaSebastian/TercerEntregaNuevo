
const mongoose = require("mongoose")

const dotenv = require('dotenv')
dotenv.config();

const db_user = process.env.DB_USER_MONGO;
const db_pass = process.env.DB_PASS_MONGO;
const db_name = process.env.DB_NAME_MONGO;

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

const Productos = mongoose.model("productos", {
  id: String,
  nombre: String,
  descripcion: String,
  codigo:String,
  thumbnail:String,
  precio: String, 
  imgUrl: String,
  stock: String,
});


const Carrito = mongoose.model("Carrito", {
  timestamp: Date,
  nombre: String,
  descripcion: String,
  codigo:String,
  thumbnail:String,
  precio: String, 
  imgUrl: String,
  cantidad: String,
});
  
  




module.exports={Users,Productos,Carrito,DBConnect}

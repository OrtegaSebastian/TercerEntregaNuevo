
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
  timestamp:Date,
  nombre: String,
  descripcion: String,
  codigo:String,
  imgUrl: String,
  precio: String,   
  stock: String,
});


const Carrito = mongoose.model("Carrito", {
  timestamp: Date,
  nombre: String,
  descripcion: String,
  codigo:String,
  imgUrl:String,
  precio: String, 
  cantidad: String,
});
  
const Orden = mongoose.model("Orden", {
  userId: { type: String, required: true },
  timestamp: Date ,
  productos: [
    {
      productosId: {
        type: String,
      },
      cantidad: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalCompra: { type: Number, required: true },
  direccion: { type: Object, required: true },
  estado: { type: String, default: "pendiente" },
}

);  

const Chat = mongoose.model("Chat", {
  correo: String,
  tipo: String,
  fechaYHora: Date,
  cuerpo: String
});


module.exports={Users,Productos,Carrito,Chat,Orden,DBConnect}

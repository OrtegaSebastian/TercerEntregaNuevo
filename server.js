const express = require("express");
const dotenv = require("dotenv");
const http = require('http');

const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const {DBConnect} = require('./config/mongoconf')
const logger = require("./config/log4js")

const {router} = require('./routers/Home.routes')
const Productos =require('./routers/Productos.routes')
const Carritos = require('./routers/Carritos.routes')
const Chat = require('./routers/Chat.routes')
const Ordenes = require('./routers/Ordenes.routes')

dotenv.config()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "hbs");


const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));

//SERVIDOR -----------------------------------------
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      `mongodb+srv://${process.env.DB_USER_MONGO}:${process.env.DB_PASS_MONGO}@cluster0.epscnqt.mongodb.net/${process.env.DB_NAME_MONGO}`,
      //ttl: 600000
    }),

    secret: process.env.PASS_SEC,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })

);

app.use(passport.initialize());
app.use(passport.session());

//RUTAS -----------------------------------------------------------
app.use(router);
app.use("/productos", Productos);
app.use("/carrito", Carritos);
app.use("/chat",Chat);
app.use("/ordenes",Ordenes);

// CONTROL RUTAS INVALIDAS ---------------------------------------------
app.all("*", (req, res) => {
  logger.warn(`Ruta Inexistente: Método ${req.method} Ruta: ${req.url}`);
  res.send({ error: true }).status(500);
});

const server = http.createServer(app);

// INICIO SERVIDOR -----------------------------------
let DB_TYPE = process.env.TIPO;
let PORT = process.env.PORT || 8090;

if (DB_TYPE === 'mongodb') {
  DBConnect(() => {
    const connectedServer = server.listen(PORT, () => {
      console.log(
        `Servidor http escuchando en el puerto ${
          connectedServer.address().port
        }`
      );
    });
    connectedServer.on("error", (error) =>
      console.log(`Error en servidor ${error}`)
    );
  });
} else {
  console.log('Tipo de base de datos no soportado');
}

//io
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('mensaje', (data) => {
    console.log(`Mensaje recibido: ${data}`);
    socket.emit('mensaje', `Recibí tu mensaje: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});




















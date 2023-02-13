const express = require("express");
const dotenv = require("dotenv");

let {Server } = require('http')
const session = require('express-session')
const cluster = require('cluster')
const {cpus} = require('os')
const ParsedArgs = require('minimist')
const logger = require('./config/log4js')

const MongoStore = require('connect-mongo')
const passport = require('passport')
const {DBConnect} = require('./config/mongoconf')

const {router} = require('./routers/home')
const mainProductos =require('./routers/mainProductos')
const mainCarritos = require('./routers/mainCarritos')
const chat = require('./routers/chat')


dotenv.config()
const app = express()
Server = new Server(app)
const cpu = cpus();


app.use((req, res, next) => {
  logger.info(`Petición Recibida: Método: ${req.method} Ruta: ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "hbs");
// const handlebars = require("handlebars");
// handlebars.allowProtoPropertiesByDefault = true;
const exphbs = require("express-handlebars");
const ex = require("express-handlebars");
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));






//SERVIDOR -----------------------------------------
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://sebasindahouse:Mosi0310@cluster0.epscnqt.mongodb.net/sesiones",
      //ttl: 600000
    }),

    secret: "123asd1352",
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
app.use("/productos", mainProductos);
app.use("/carrito", mainCarritos);

// CONTROL RUTAS INVALIDAS ---------------------------------------------
app.all("*", (req, res) => {
  logger.warn(`Ruta Inexistente: Método ${req.method} Ruta: ${req.url}`);
  res.send({ error: true }).status(500);
});






// INICIO SERVIDOR -----------------------------------
const options = {
  alias: {
    m: "MODO",
  },
  default: {
    MODO: "FORK",
  },
};

const argv = process.argv.slice(2);
const { MODO } = ParsedArgs(argv, options);
const PORT = process.env.PORT || 8090

if (MODO === "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Primary: ${process.pid}`);
    for (let i = 0; i < cpu.length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker whit id: ${worker.process.pid} killed`);
      cluster.fork();
    });
  } else {
    DBConnect(() => {
      const connectedServer = Server.listen(PORT, () => {
        console.log(
          `Servidor http escuchando en el puerto ${
            connectedServer.address().port
          } en modo ${MODO} en el worker ${process.pid}`
        );
      });
      connectedServer.on("error", (error) =>
        console.log(`Error en servidor ${error}`)
      );
    });
  }
} else {
  DBConnect(() => {
    const connectedServer = Server.listen(PORT, () => {
      console.log(
        `Servidor http escuchando en el puerto ${
          connectedServer.address().port
        } en modo ${MODO} en el worker ${process.pid}`
      );
    });
    connectedServer.on("error", (error) =>
      console.log(`Error en servidor ${error}`)
    );
  });
}













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

const {homeRouter} = require('./routers/home')
const mainProductos =require('./routers/mainProductos')
const mainCarritos = require('./routers/mainCarritos')


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
app.use(homeRouter);
app.use("/api/productos", mainProductos);
app.use("/api/carrito", mainCarritos);

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
      const connectedServer = httpServer.listen(PORT, () => {
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
    const connectedServer = httpServer.listen(PORT, () => {
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


















// //express y config server
// const express = require("express");
// const app = express();
// const bCrypt = require("bcrypt");
// const session = require("express-session");
// const port = 8080;
// const dotenv = require("dotenv");
// dotenv.config("./src/.env");

// //carritos y productos
// const routerCarritos = require("./src/routes/carritos");
// const routerProductos = require("./src/routes/productos");
// const isValidPassword = require("./helpers/encrip")

// //encriptador de clave
// const createHash = require("./helpers/encrip")

// // configuro el servidor

// app.use(express.json());
// app.use(express.urlencodigod({ extended: true }));
// app.use(express.static("public"));


// //hbs
// const exphbs = require("express-handlebars");
// const ex = require("express-handlebars");

// //passport
// const passport = require("passport");
// const { Strategy } = require("passport-local");
// const cookieParser = require("cookie-parser");

// //importaciones otros archivos

// const DAOUserMongo = require ('./daos/usuarios/usuarioDao')
// const Users= new DAOUserMongo()


// //configuraciones
// const config = require("./config");
// const controllersdb = require("./controllersdb");
// const routes = require("./routes");

// // Configuracion de las vistas
// // TODO: express handlebars utiliza el import entero ahora

// app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));



// app.set("view engine", ".hbs");
// app.use(express.urlencodigod({ extended: true }));
// app.use(express.static(__dirname + "/views"));

// //session
// app.use(cookieParser("my secret"));
// const MongoStore = require('connect-mongo')

// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl:"mongodb://127.0.0.1:27017/sesiones",
//       // mongoUrl:"mongodb+srv://sebasindahouse:Mosi0310@cluster0.epscnqt.mongodb.net/sesiones",
//       ttl:10,
//     }),
//     secret: "my secret",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: config.TIEMPO_EXPIRACION,
//     },
//   })
// );



// passport.use(
//   "signup",
//   new Strategy({passReqToCallback: true,},
//     (req, username, password, done) => {
//       const {nombre}= req.body
//       const {edad}= req.body
//       const {apellido}= req.body
//       const {correo}= req.body
//       const {phone}=req.body
//     Users.findOne({ username }, (err, user) => {
//       if (user) return done(null, false);
//       Users.create({
//         nombre,
//         edad,
//         apellido,
//         correo,
//         phone
//           })


//           if (err) {
//               return done(err);
//           };

//           // si el user ya exite cortamos el flujo
//           if (username) {
//               return done(null, false);
//           }

//           // Si llegamos a este punto, quiere decir que el usuario no existe, entonces le damos de alta al usuario
//           const newUser = {
//               username: username,
//               password: createHash(password), //usamos bCrypt para encriptar la contraseña          
//           };

//           // insertamos en mongo el nuevo usuario que creamos y validamos
//           Users.saveUser(newUser, (err, userWithId) => {
//               if (err) {
//                   return done(err);
//               }
//               return done(null, userWithId);
//           })
//       });
//   }
// ));
// // validamos si el usuario existe y ademas si la contraseña conincide
// passport.use(
//   "login",
//   new Strategy({}, (username, password, done) => {
//     Users.findOne({ username }, (err, user) => {
//       if (err) return done(err);
//       if (!user) return done(null, false);
//       if (!validatePass(password, user.password)) return done(null, false);
//       return done(null, user);
//     });
//   }) 
// );

// passport.serializeUser((userObj, done) => {
//   done(null, userObj._id);
// });

// passport.deserializeUser((id, done) => {
//   Users.findById(id, done);
// });

// //inicializamos passport
// app.use(passport.initialize());
// app.use(passport.session());


// app.use("/api/productos", routerProductos);
// app.use("/api/carritos", routerCarritos);

// //LOGIN
// app.get("/login", routes.getLogin);
// //Aqui usamos la estrategia que configuramos, que se llama 'login', si este falla redireccionamos a getFailLogin, si no falla redireccionamos a postLogin
// app.post(
//   "/login",
//   passport.authenticate("login", {
//     failureRedirect: "/faillogin",
//   }),
//   routes.postLogin
// );
// app.get("/faillogin", routes.getFailLogin);

// //SIGNUP
// app.get("/signup", routes.getSignUp);
// app.post(
//   "/signup",
//   passport.authenticate("signup", {
//     failureRedirect: "/failsignup",
//   }),
//   routes.postSignup
// );
// app.get("/failsignup", routes.getFailsignup);

// //Last part
// function checkAuthentication(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// }

// // simulamos una ruta protegida usando como middleware checkAuthentication
// app.get("/ruta-protegida", checkAuthentication, (req, res) => {
//   const { user } = req;
//   console.log(user);
//   res.send("<h1>Ruta OK!</h1>");
// });

// //LOGOUT
// app.get("/logout", routes.getLogout);

// // ------------------------------------------------------------------------------
// //  LISTEN SERVER
// // ------------------------------------------------------------------------------
// controllersdb.conectarDB(config.URL_BASE_DE_DATOS, (err) => {
//   if (err) return console.log("error en conexión de base de datos", err);
//   console.log("BASE DE DATOS CONECTADA");

//   app.listen(8080, (err) => {
//     if (err) return console.log("error en listen server", err);
//     console.log(`Server running on port 8080`);
//   });
// });

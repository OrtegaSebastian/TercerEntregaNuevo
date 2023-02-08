const express = require('express')
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
// const ContenedorMongoDb = require("../contenedores/mongoContain")

const path = require('path')
const {dirname, extname, join} = require('path')

const bcrypt  = require ("bcrypt")
const multer  = require ("multer") 

const dotenv = require('dotenv')
dotenv.config();


const host = process.env.HOST;
const port = process.env.PORT;

const passport = require('passport')
const {Strategy} = require('passport-local')
const {Users} = require('../config/mongoconf')

const {fileURLToPath} =require ('url')

// ESTRATEGIAS -------------
passport.use(
  "registro",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { nombre } = req.body;
    const { direccion } = req.body;
    const { edad } = req.body;
    const { codigo } = req.body;
    const { telefono } = req.body;
    // const { filename } = req.file;
    const tel = `${codigo}${telefono}`;
    // const imagen = `${host}:${port}/images/${filename}`;
    try {
      const user =  Users.findOne({ username });
      if (user) return done(null, false);

      const hashedPassword =  hasPassword(password);
      const newUser =  Users.create({
        username,
        password: hashedPassword,
        nombre,
        direccion,
        edad,
        tel,
      });
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
))

passport.use(
  "login",
  new Strategy({}, async (username, password, done) => {
    try {
      const user = await Users.findOne({ username });
      if (!user) return done(null, false);

      const isValid = await validatePass(password, user.password);
      if (!isValid) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});

// ENCRIPTACIÓN ----------------
const hasPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

const validatePass =async (pass, hashedPass) => {
  return bcrypt.compare(pass, hashedPass);
};

//AUTENTICACIÓN ------------------
const authMw = (req, res, next) => {
  req.isAuthenticated() ? next() : res.send({ error: "sin session" });
};

//RUTAS ------------------------------

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const nombre = req.user.nombre;
    res.render(path.join(process.cwd(), "/views/home.hbs"), {
      nombre: nombre,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/login.hbs"));
  }
});

router.get("/registro", (req, res) => {
  res.render(path.join(process.cwd(), "/views/registro.hbs"), {
    okRegister: " ",
  });
});

router.post("/registro", async (req, res, next) => {
  try {
  const { nombre } = req.body;
  const { apellido } = req.body;
  const { direccion } = req.body;
  const { correo } = req.body;
  const { edad } = req.body;
  const { codigo } = req.body;
  const { telefono } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  const { imgUrl } = req.body;
  const tel = `${codigo}${telefono}`;

const user = await Users.findOne({ username });
if (user) return res.send({ error: "El nombre de usuario ya existe" });

const hashedPassword = await hasPassword(password);
const newUser = await Users.create({
  username,
  password: hashedPassword,
  nombre,
  apellido,
  direccion,
  correo,
  telefono,
  edad,
  tel,
  imgUrl
});
req.login(newUser, (err) => {
  if (err) return next(err);
  return res.render(path.join(process.cwd(), "/views/registro.hbs"), {
    okRegister: "¡Usuario registrado con éxito!",
  });
});
} catch (err) {
next(err);
}
});

router.post(
  "/login",
  passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/errorLogin",
  })
  );



router.get("/datos", authMw, (req, res) => {
  res.send({ data: req.user });
});

router.get("/carrito", authMw, (req, res) => {
  const nombre = req.user.nombre;
  // res.render("/.hbs", { nombre: nombre });
  return res.render(path.join(process.cwd(), "/views/carrito.hbs"))})


router.get("/cuenta", authMw, (req, res) => {
  const username = req.user.username
  const nombre = req.user.nombre;
  const imagen = req.user.imgUrl;
  const direccion = req.user.direccion;
  const edad = req.user.edad;
  const correo = req.user.username;
  const telefono = req.user.telefono;

  
  return res.render(path.join(process.cwd(), "/views/cuenta.hbs"), { nombre,
    username,
    imagen,
    nombre: nombre,
    direccion,
    edad,
    correo,
    telefono,
    });
});

router.get("/logout", (req, res) => {
  if (req.user) {
    const nombre = req.user.nombre;
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
});

router.get("/errorLogin", (req, res) => {
  res.render(path.join(process.cwd(), "./views/login-error"));
});

router.get("/errorRegistro", (req, res) => {
  res.render(path.join(process.cwd(), "./views/registro-error"));
});

router.get("/idUsuario", (req, res) => {
  const idUsuario = req.user._id;
  res.send(idUsuario);
});

module.exports = {router,authMw};

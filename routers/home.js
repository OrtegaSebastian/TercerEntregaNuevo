const express = require('express')
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// const {Router}= require('express')

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


/// anterior//////////////////////////////////////////////////////


// router.post(
//   "/signup",
//   upload.single("myFile"),
//   passport.authenticate("signup", { failureRedirect: "/errorRegister" }),
//   (req, res, next) => {
//     req.session.user= req.body.username;
//     res.render(path.join(process.cwd(), "/views/signup"), {
//       okRegister: "¡Usuario registrado con éxito! Puede iniciar sesión",
//     });
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("login", { failureRedirect: "/errorLogin" }),
//   (req, res) => {
//     req.session.user = req.body.username
//     res.redirect("/");
//   }
// );

////////////////////////////////////////////////////////////////////
router.post("/registro", async (req, res, next) => {
  try {
  const { nombre } = req.body;
  const { direccion } = req.body;
  const { edad } = req.body;
  const { codigo } = req.body;
  const { telefono } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  const tel = `${codigo}${telefono}`;

const user = await Users.findOne({ username });
if (user) return res.send({ error: "El nombre de usuario ya existe" });

const hashedPassword = await hasPassword(password);
const newUser = await Users.create({
  username,
  password: hashedPassword,
  nombre,
  direccion,
  edad,
  tel,
});
req.login(newUser, (err) => {
  if (err) return next(err);
  return res.render(path.join(process.cwd(), "/views/signup.hbs"), {
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

// router.post('/login', async (req, res) => {
//   try{
//       const user = await Users.findOne(
//           {
//               username: req.body.user_name
//           }
//       );

//       !user && res.status(401).json("Wrong User Name");

//       const hashedPassword = CryptoJS.AES.decrypt(
//           user.password,
//           process.env.PASS_SEC
//       );


//       const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

//       const inputPassword = req.body.password;
      
//       originalPassword != inputPassword && 
//           res.status(401).json("Wrong Password");

//       const accessToken = jwt.sign(
//       {
//           id: user._id,
//           isAdmin: user.isAdmin,
//       },
//       process.env.JWT_SEC,
//           {expiresIn:"3d"}
//       );

//       const { password, ...others } = user._doc;  
//       res.status(200).json({...others, accessToken});

//   }catch(err){
//       res.status(500).json(err);
//   }

// });


router.get("/datos", authMw, (req, res) => {
  res.send({ data: req.user });
});

router.get("/carrito", authMw, (req, res) => {
  const nombre = req.user.nombre;
  // res.render("/.hbs", { nombre: nombre });
  return res.render(path.join(process.cwd(), "/views/carrito.hbs"))})


router.get("/cuenta", authMw, (req, res) => {
  const nombre = req.user.nombre;
  const imagen = req.user.imgUrl;
  const direccion = req.user.direccion;
  const edad = req.user.edad;
  const correo = req.user.username;
  const telefono = req.user.telefono;

  res.render("/cuenta.hbs", { nombre,
    imagen,
    nombre: nombre,
    direccion,
    edad,
    correo,
    telefono,
    });
});

router.get("/logout", (req, res) => {
  const nombre = req.user.name;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.render(path.join(process.cwd(), "/views/login.hbs"), {     
    });
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

module.exports = {router};



// VERRRRRRRRRRRRRRRRRRRRRR LUEGO

// //MULTER ----------------------------

// const CURRENT_DIR = __dirname
// const MIMETYPES = ["image/jpg", "image/png"];

// const storage = multer.diskStorage({
//   destination: join(CURRENT_DIR, "../public/images"),
//   filename: (req, file, cb) => {
//     const fileExtension = extname(file.originalname);
//     const fileName = file.originalname.split(fileExtension)[0];
//     cb(null, `${fileName}-${Date.now()}${fileExtension}`);
//   },
//   fileFilter: (req, file, cb) => {
//     if (MIMETYPES.includes(file.mimetype)) cb(null, true);
//     else cb(new Error(`Solo permitidos los archivos ${MIMETYPES.join(" ")}`));
//   },
//   limits: {
//     fieldSize: 10000000,
//   },
// });

// const upload = multer({ storage });
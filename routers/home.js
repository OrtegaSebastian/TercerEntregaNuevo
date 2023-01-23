const {Router}= require('express')

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

const homeRouter = new Router();

//MULTER ----------------------------

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/jpg", "image/png"];

const storage = multer.diskStorage({
  destination: join(CURRENT_DIR, "../public/images"),
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Solo permitidos los archivos ${MIMETYPES.join(" ")}`));
  },
  limits: {
    fieldSize: 10000000,
  },
});

const upload = multer({ storage });

// ESTRATEGIAS -------------
passport.use(
  "signup",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { nombre } = req.body;
    const { direccion } = req.body;
    const { edad } = req.body;
    const { codigo } = req.body;
    const { telefono } = req.body;
    const { filename } = req.file;
    const phone = `${code}${number}`;
    const imgUrl = `${host}:${port}/images/${filename}`;
    Users.findOne({ username }, (err, user) => {
      if (user) return done(null, false);
      Users.create(
        {
          username,
          password: hasPassword(password),
          nombre,
          direccion,
          edad,
          telefono,
          imgUrl,
        },
        (err, user) => {
          if (err) return done(err);
          return done(null, user);
        }
      );
    });
  })
);

passport.use(
  "login",
  new Strategy({}, (username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!validatePass(password, user.password)) return done(null, false);
      return done(null, user);
    });
  })
);

passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});

// ENCRIPTACIÓN ----------------
const hasPassword = (pass) => {
  // ocultar
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
};

const validatePass = (pass, hashedPass) => {
  // validar
  return bcrypt.compareSync(pass, hashedPass);
};

//AUTENTICACIÓN ------------------
const authMw = (req, res, next) => {
  req.isAuthenticated() ? next() : res.send({ error: "sin session" });
};

//RUTAS ------------------------------

homeRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const nombre = req.user.nombre;
    res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
      nombre: nombre,
    });
  } else {
    res.redirect("/login");
  }
});

homeRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

homeRouter.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
    okRegister: " ",
  });
});

homeRouter.post(
  "/signup",
  upload.single("myFile"),
  passport.authenticate("signup", { failureRedirect: "/errorRegister" }),
  (req, res, next) => {
    res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
      okRegister: "¡Usuario registrado con éxito! Puede iniciar sesión",
    });
  }
);

homeRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

homeRouter.get("/datos", authMw, (req, res) => {
  res.send({ data: req.user });
});

homeRouter.get("/carrito", authMw, (req, res) => {
  const nombre = req.user.nombre;
  res.render("pages/carrito.ejs", { nombre: nombre });
});

homeRouter.get("/cuenta", authMw, (req, res) => {
  const nombre = req.user.nombre;
  const imagen = req.user.imgUrl;
  const direccion = req.user.address;
  const edad = req.user.age;
  const email = req.user.username;
  const telefono = req.user.phone;

  res.render("pages/cuenta.ejs", { nombre,
    imagen,
    nombre: nombre,
    direccion,
    edad,
    email,
    telefono,
    });
});

homeRouter.get("/logout", (req, res) => {
  const name = req.user.name;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("/login", { name: name });
  });
});

homeRouter.get("/errorLogin", (req, res) => {
  res.render(path.join(process.cwd(), "./views/login-error"));
});

homeRouter.get("/errorRegister", (req, res) => {
  res.render(path.join(process.cwd(), "./views/signup-error"));
});

homeRouter.get("/idUsuario", (req, res) => {
  const idUsuario = req.user._id;
  res.send(idUsuario);
});

export default homeRouter;

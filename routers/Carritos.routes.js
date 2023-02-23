const {Router} = require('express')
const router = Router();
const {CarritosDao} = require('../daos/factory')
const {Carrito} = require('../config/mongoconf')
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const mongoose = require('mongoose');


const carritoEmpresa = CarritosDao;

router.post("/", async (req, res) => {
  try {
    const timestamp = new Date();
    const id_user = req.body.id_user;
    const productos = [];
    const nuevoCarrito = new Carrito({ timestamp, id_user, productos });
    const newId = await nuevoCarrito.save();
    res.render("carrito");
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const encontrado = await Carrito.findByIdAndDelete(id);
    if (encontrado) {
      res.send("Carrito Eliminado");
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    let encontrado = await Carrito.findById(id);
    if (encontrado) {
      const { productos } = encontrado;
      res.send(productos);
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.post("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_prod,
      nombre,
      descripcion,
      codigo,
      imgUrl,
      precio,
      stock,
      cantidad,
      categoria
    } = req.body;
    const timestamp = new Date();
    await Carrito.findByIdAndUpdate(
      id,
      {
        $push: {
          productos: {
            id_prod,
            timestamp,
            nombre,
            descripcion,
            codigo,
            imgUrl,
            precio,
            stock,
            cantidad,
            categoria
          }
        }
      }
    );
    return res.send("Producto Cargado");
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const producto = await Carrito.findOneAndUpdate({ _id: id, 'productos._id': id_prod }, { $pull: { productos: { _id: id_prod } } });
    if (producto) {
      res.send("Producto Eliminado");
    } else {
      res.send({ error: "producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.get("/idCarrito/:id_user", async (req, res) => {
  try {
    const { id_user } = req.params;
    const carrito = await Carrito.findOne({ usuario: id_user });
    if (carrito) {
      res.send({ id: carrito._id });
    } else {
      res.send({ error: "carrito no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findById(id);
    
    if (!carrito) {
      return res.status(404).send({ error: "El carrito no existe" });
    }
    
    //actualización de los datos del carrito
    carrito.nombre = req.body.nombre;
    carrito.precio = req.body.precio;
    carrito.cantidad = req.body.cantidad;
    carrito.productoId = req.body.productoId;
    
    //guardamos los cambios
    const updatedCarrito = await carrito.save();
    
    res.send(updatedCarrito);
  } catch (error) {
    res.status(400).send(error);
  }});

  router.get('/', async (req, res) => {
    try {
      const carritos = await Carrito.find().lean();
      if (carritos.length > 0) {
        res.render('carrito', { carritos });
      } else {
        res.render('home', { carritos: [] });
      }
    } catch (error) {
      console.error(error);
      res.render('error', { message: 'Ha ocurrido un error en el servidor' });
    }
  });
  



module.exports = router;


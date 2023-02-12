const jwt = require("jsonwebtoken");
const express = require('express')
const router = express.Router();
const secretKey = process.env.PASS_SEC;
const {Productos} = require('../config/mongoconf')
const authMw = require ('./home')
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const mongoose = require('mongoose');

require('dotenv').config();

router.get("/", async function (req, res) {
  try {
    const productos = await Productos.find();
    res.render("home", {
      productos: productos
    });
  } catch (error) {
    res.render('error: '+ error);
  }
});


router.get("/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const encontrado = await Productos.findById(id);
    if (encontrado) {
      res.json({
        success: true,
        data: encontrado,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

 
// quite authAdmin
router.post("/",  async (req, res) => {
  const timestamp = new Date();
  try {
    const { nombre, descripcion, codigo, imgUrl, precio, stock } = req.body;
    const producto = new Productos({
      timestamp,
      nombre,
      descripcion,
      codigo,
      imgUrl,
      precio,
      stock,
    });
    const savedProduct = await producto.save();
    res.json({
      success: true,
      message: `Product added: ${nombre} with ID ${savedProduct._id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


//quite authAdmin
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, nombre, descripcion, codigo, imgUrl, precio, stock } = req.body;
    const encontrado = await Productos.findByIdAndUpdate(id, {
      timestamp,
      nombre,
      descripcion,
      codigo,
      imgUrl,
      precio,
      stock,
    }, {new: true});
    if (encontrado) {
      res.status(200).send({ message: "Producto Modificado" });
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//quite authAdmin

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const encontrado = await Productos.findByIdAndRemove(id);
    if (encontrado) {
      res.status(200).send({ message: "Producto Eliminado" });
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;



// const authAdmin = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({
//       error: "No token provided",
//     });
//   }
//   try {
//     const decoded = jwt.verify(token, secretKey);
//     if (decoded.role !== "admin") {
//       return res.status(401).json({
//         error: "Unauthorized",
//       });
//     }
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       error: "Invalid token",
//     });
//   }
// };

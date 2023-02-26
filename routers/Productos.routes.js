  const jwt = require("jsonwebtoken");
  const express = require('express')
  const router = express.Router();
  const secretKey = process.env.PASS_SEC;
  const {Productos} = require('../config/mongoconf')
  const authMw = require ('./Home.routes')
  const { ContenedorMongoDb } = require("../contenedores/mongoContain");
  const mongoose = require('mongoose');

  require('dotenv').config();

  router.get("/", async function (req, res) {
    try {
      const productos = await Productos.find().lean();
      if (productos.length > 0) {
        res.render("home", {
          productos: productos
        });
      } else {
        res.render("home", {
          productos: []
        });
      }
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
          error: "Producto no encontrado",
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
      const { nombre, descripcion, codigo, imgUrl, precio, cantidad, categoria } = req.body;
      const producto = new Productos({
        timestamp,
        nombre,
        descripcion,
        codigo,
        imgUrl,
        precio,
        cantidad,
        categoria
      });
      const savedProduct = await producto.save();
      res.json({
        success: true,
        message: `Producto agregado: ${nombre} con ID ${savedProduct._id}`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });
  


  router.get("/:categoria", async (req, res) => {
    try {
      const { categoria } = req.params;
      const productos = await Productos.find({ categoria });
      if (productos.length > 0) {
        res.render("productos", { productos, categoria });
      } else {
        res.status(404).json({
          success: false,
          error: "No se encontraron productos en esta categoria",
        });
      }
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
      const { timestamp, nombre, descripcion, codigo, imgUrl, precio, cantidad ,categoria} = req.body;
      const encontrado = await Productos.findByIdAndUpdate(id, {
        timestamp,
        nombre,
        descripcion,
        codigo,
        imgUrl,
        precio,
        cantidad,
        categoria
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

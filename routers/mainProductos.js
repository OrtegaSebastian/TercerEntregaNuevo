const jwt = require("jsonwebtoken");
const express = require('express')
const router = express.Router();
const secretKey = process.env.PASS_SEC;
const {Productos} = require('../config/mongoconf')
const authMw = require ('./home')

require('dotenv').config();





const authAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      error: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role !== "admin") {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

router.get("/", async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json({
      success: true,
      data: productos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
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

 

router.post("/", authAdmin, async (req, res) => {
  const timestamp = new Date();
  try {
    const { nombre, descripcion, codigo, thumbnail, precio, stock } = req.body;
    const id = await Productos.save({
      timestamp,
      nombre,
      descripcion,
      codigo,
      thumbnail,
      precio,
      stock,
    });
    res.json({
      success: true,
      message: `Product added: ${nombre} with ID ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.put("/:id", authAdmin, async (req, res) => {
  try {
  const { id } = req.params;
  const { timestamp, nombre, descripcion, codigo, thumbnail, precio, stock } =
  req.body;
  const encontrado = await Productos.changeById({
  id,
  timestamp,
  nombre,
  descripcion,
  codigo,
  thumbnail,
  precio,
  stock,
  });
  if (encontrado) {
  res.status(200).send("Producto Modificado");
  } else {
  res.status(404).send({ error: "Producto no encontrado" });
  }
  } catch (error) {
  res.status(500).send({ error: true });
  }
  });
  

  router.get("/", async function (req, res) {
    try {
    const productos = await Productos.getAll();
    res.json({
    success: true,
    data: productos,
    });
    } catch (error) {
    res.status(500).json({
    success: false,
    error: error.message,
    });
    }
    });


  router.delete("/:id", authAdmin, async (req, res) => {
  try {
  const { id } = req.params;
  const encontrado = await Productos.deleteById(id);
  if (encontrado) {
  res.status(200).send("Producto Eliminado");
  } else {
  res.status(404).send({ error: "producto no encontrado" });
  }
  } catch (error) {
  res.status(500).send({ error: true });
  }
  });

module.exports = router;

const { Router } = require('express')
const router = Router();
const mongoose = require('mongoose');
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const { logger } = require('../config/log4js')
const {Carrito} =require('../config/mongoconf')
const {Orden} =require('../config/mongoconf')




// Obtener todas las órdenes de un usuario
router.get("/:id_usuario", async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const ordenes = await Orden.find({ id_usuario });
    res.json(ordenes);
  } catch (error) {
    logger.error(`Error en Ruta Get: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Actualizar una orden
router.put("/:id_usuario/:id", async (req, res) => {
  try {
    const { id_usuario, id } = req.params;
    const ordenActualizada = req.body;
    await Orden.findOneAndUpdate({ _id: id, id_usuario }, ordenActualizada);
    res.send("Orden actualizada correctamente");
  } catch (error) {
    logger.error(`Error en Ruta change by ID: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Eliminar una orden
router.delete("/:id_usuario/:id", async (req, res) => {
  try {
    const { id_usuario, id } = req.params;
    await Orden.findOneAndDelete({ _id: id, id_usuario });
    res.send("Orden eliminada correctamente");
  } catch (error) {
    logger.error(`Error en Ruta delete by Id: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Obtener una orden por ID
router.get("/:id_usuario/:id", async (req, res) => {
  try {
    const { id_usuario, id } = req.params;
    const orden = await Orden.findOne({ _id: id, id_usuario });
    if (!orden) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    res.json(orden);
  } catch (error) {
    logger.error(`Error en Ruta get by Id: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});


module.exports = router;

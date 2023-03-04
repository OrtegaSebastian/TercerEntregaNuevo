const { Router } = require('express')
const router = Router();
const mongoose = require('mongoose');
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const { logger } = require('../config/log4js')
const {Carrito} =require('../config/mongoconf')
const {Orden} =require('../config/mongoconf')


// Obtener todas las órdenes de un usuario y número de orden
router.get("/:id_usuario/:numero_orden", async (req, res) => {
  try {
    const { id_usuario, numero_orden } = req.params;
    const ordenes = await Orden.find({ id_usuario, numero_orden });
    res.json(ordenes);
  } catch (error) {
    logger.error(`Error en Ruta Get: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Actualizar una orden por usuario y número de orden
router.put("/:id_usuario/:numero_orden", async (req, res) => {
  try {
    const { id_usuario, numero_orden } = req.params;
    const estado = req.body;
    await Orden.findOneAndUpdate({ id_usuario, numero_orden }, estado);
    res.send("Orden actualizada correctamente");
  } catch (error) {
    logger.error(`Error en Ruta change by ID: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Eliminar una orden por usuario y número de orden
router.delete("/:id_usuario/:numero_orden", async (req, res) => {
  try {
    const { id_usuario, numero_orden } = req.params;
    await Orden.findOneAndDelete({ id_usuario, numero_orden });
    res.send("Orden eliminada correctamente");
  } catch (error) {
    logger.error(`Error en Ruta delete by Id: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Obtener una orden por ID y número de orden
router.get("/:id_usuario/:numero_orden/:id", async (req, res) => {
  try {
    const { id_usuario, numero_orden, id } = req.params;
    const orden = await Orden.findOne({ _id: id, id_usuario, numero_orden });
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

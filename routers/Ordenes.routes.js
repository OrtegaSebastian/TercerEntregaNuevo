const { Router } = require('express')
const router = Router();
const { Orden } = require('../config/mongoconf')
const { ordenesDAO } = require('../daos/factory')
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const mongoose = require('mongoose');

// DAO object
const daoOrdenesMongo = ordenesDAO(new ContenedorMongoDb());

// Obtener todas las órdenes
router.get("/", async (req, res) => {
  try {
    const orders = await daoOrdenesMongo.getAll();
    res.render("orders", { orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Crear una nueva orden
router.post("/", async (req, res) => {
  try {
    const nuevaOrden = req.body;
    const id = await daoOrdenesMongo.save(nuevaOrden);
    res.json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Obtener una orden por ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const orden = await daoOrdenesMongo.getById(id);
    res.json(orden);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Actualizar una orden
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ordenActualizada = req.body;
    await daoOrdenesMongo.updateById(id, ordenActualizada);
    res.send("Orden actualizada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Eliminar una orden
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await daoOrdenesMongo.deleteById(id);
    res.send("Orden eliminada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;

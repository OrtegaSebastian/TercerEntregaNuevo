const { Router } = require('express')
const router = Router();
const mongoose = require('mongoose');
const { ContenedorMongoDb } = require("../contenedores/mongoContain");
const { logger } = require('../config/log4js')
const {Carrito} =require('../config/mongoconf')


// Crear instancia de ContenedorMongoDb
const ordenesDAO = new ContenedorMongoDb('ordenes', new mongoose.Schema({
  id_usuario: { type: String, required: true },
  id_carrito: { type: String, required: true },
  fecha: { type: Date, required: true },
  productos: { type: [Carrito], default: [] },
}));

// Obtener todas las órdenes de un usuario
router.get("/:id_usuario", async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const ordenes = await ordenesDAO.traerTodos({ id_usuario });
    res.render("ordenes", { ordenes });
  } catch (error) {
    logger.error(`Error en Ruta Get: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Crear una nueva orden
router.post("/", async (req, res) => {
  try {
    // Obtener los datos de la solicitud
    const { id_usuario, id_carrito, productos } = req.body;

    // Buscar el carrito por ID
    const carrito = await Carrito.findById(id_carrito);

    // Verificar que el carrito existe
    if (!carrito) {
      return res.status(404).json({ error: "El carrito no existe" });
    }

    // Verificar que el ID de usuario coincide con el del carrito
    if (carrito.id_usuario !== id_usuario) {
      return res.status(401).json({ error: "No está autorizado para realizar esta acción" });
    }

    // Crear la nueva orden
    const nuevaOrden = {
      id_usuario,
      id_carrito,
      fecha: new Date(),
      productos,
    };
    const nuevaOrdenGuardada = await ordenesDAO.guardar(nuevaOrden);

    // Actualizar el estado del carrito
    carrito.estado = "compra terminada";
    await carrito.save();

    res.json({ nuevaOrdenGuardada, carrito });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});


// Obtener una orden por ID
router.get("/:id_usuario/:id", async (req, res) => {
  try {
    const { id_usuario, id } = req.params;
    const orden = await ordenesDAO.traerPorId(id, { id_usuario });
    res.json(orden);
  } catch (error) {
    logger.error(`Error en Ruta get by Id: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

// Actualizar una orden
router.put("/:id_usuario/:id", async (req, res) => {
  try {
    const { id_usuario, id } = req.params;
    const ordenActualizada = req.body;
    await ordenesDAO.cambiarPorId({ ...ordenActualizada, id }, { id_usuario });
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
    await ordenesDAO.borrarPorId(id, { id_usuario });
    res.send("Orden eliminada correctamente");
  } catch (error) {
    logger.error(`Error en Ruta delete by Id: ${error}`);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;

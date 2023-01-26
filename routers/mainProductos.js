const {Router} = require('express')

const {ProductosDao} = require('../daos/index')


const router = Router();
const productosEmpresa = ProductosDao;

const admin = true;

const authAdmin = (req, res, next) => {
  if (admin) {
    next();
  } else {
    const route = req.originalUrl;
    const method = req.method;
    res.status(401).json({
      error: -2,
      descripcion: `Ruta: ${route} Método: ${method}  No autorizada`,
    });
  }
};

router.get("/", async (req, res) => {
  try {
    const productos = await productosEmpresa.getAll();
    res.send(productos);
  } catch (error) {
    res.send({ error: true });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const encontrado = await productosEmpresa.getById(id);
    if (encontrado) {
      res.send(encontrado);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.post("/", authAdmin, async (req, res) => {
  const timestamp = new Date();
  try {
    const { nombre, descripcion, codigo, thumbnail, precio, stock } = req.body;
    const id = await productosEmpresa.save({
      timestamp,
      nombre,
      descripcion,
      codigo,
      thumbnail,
      precio,
      stock,
    });
    res.send(`Se agregó el producto: ${nombre} con ID ${id}`);
  } catch (error) {
    res.send({ error: true });
  }
});

router.put("/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, nombre, descripcion, codigo, thumbnail, precio, stock } =
      req.body;
    const encontrado = await productosEmpresa.changeById({
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
      res.send("Producto Modificado");
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const encontrado = await productosEmpresa.deleteById(id);
    if (encontrado) {
      res.send("Producto Eliminado");
    } else {
      res.send({ error: "producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

module.exports = {router};

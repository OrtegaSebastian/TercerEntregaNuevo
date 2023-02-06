const {Router} = require('express')
const router = Router();
const {CarritosDao} = require('../daos/factory')


const carritoEmpresa = CarritosDao;

router.post("/", async (req, res) => {
  try {
    //const { id_user } = req.params;
    const timestamp = new Date();
    const id_user = req.body.id_user;
    const productos = [];
    const newId = await carritoEmpresa.save({ timestamp, id_user, productos });
    res.send("El Id del nuevo carrito es:" + " " + newId);
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const encontrado = await carritoEmpresa.deleteById(id);
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
    let encontrado = await carritoEmpresa.getById(id);
    if (encontrado) {
      const { productos } = encontrado;
      res.send(productos);
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch {
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
      thumbnail,
      precio,
      stock,
    } = req.body;
    const timestamp = new Date();
    await carritoEmpresa.guardaProductos(
      id,
      id_prod,
      timestamp,
      nombre,
      descripcion,
      codigo,
      thumbnail,
      precio,
      stock
    );
    return res.send("Producto Cargado");
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
  const { id, id_prod } = req.params;
  const encontrado = await carritoEmpresa.borrarProdporId(id, id_prod);
  if (encontrado) {
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
    let encontrado = await carritoEmpresa.getCarritoByUsuario(id_user);
    if (encontrado) {
    const { _id } = encontrado;
    res.send({ id: _id });
    } else {
    res.send({ error: "carrito no encontrado" });
    }
    } catch (error) {
    res.send({ error: true });
    }
});
module.exports = router;


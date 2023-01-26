// const Router = require("express");

// const { productosDao } = require("../../daos/index");

// const { soloAdmins } = require("../middleware/admin");

// // configuro router de productos

// const productosRouter = new Router();

// productosRouter.get("/", async (req, res) => {
//   // console.log('GET /productos')
//   const productos = await productosDao.getAllproductos();
//   res.json(productos);
// });

// productosRouter.get("/:id", async (req, res) => {
//   res.json(await productosDao.listar(req.params.id));
// });

// productosRouter.post("/", soloAdmins, async (req, res) => {
//   res.json(await productosDao.guardar(req.body));
// });

// productosRouter.put("/:id", soloAdmins, async (req, res) => {
//   res.json(await productosDao.actualizar(req.body));
// });

// productosRouter.delete("/:id", soloAdmins, async (req, res) => {
//   res.json(await productosDao.borrar(req.params.id));
// });

// // TODO: Exportar solamente prodcutosRouter
// module.exports = productosRouter;

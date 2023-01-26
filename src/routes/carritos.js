// const carritosDao = require("../../daos/index");
// const Router = require("express");
// const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')

// // configuro router de carritos

// const carritosRouter = new Router();

// carritosRouter.get("/", async (req, res) => {
//   res.json((await carritosDao.listarAll()).map((c) => c.id));
// });

// carritosRouter.post("/", async (req, res) => {
//   res.json(await carritosDao.guardar());
// });

// carritosRouter.delete("/:id", async (req, res) => {
//   res.json(await carritosDao.borrar(req.params.id));
// });

// //--------------------------------------------------
// // router de productos en carrito

// carritosRouter.get("/:id/productos", async (req, res) => {
//   const carrito = await carritosDao.listar(req.params.id);
//   res.json(carrito.productos);
// });

// carritosRouter.post("/:id/productos", async (req, res) => {
//   const carrito = await carritosDao.listar(req.params.id);
//   const producto = await productosApi.listar(req.body.id);
//   carrito.productos.push(producto);
//   await carritosDao.actualizar(carrito);
//   res.end();
// });

// carritosRouter.delete("/:id/productos/:idProd", async (req, res) => {
//   const carrito = await carritosDao.listar(req.params.id);
//   const index = carrito.productos.findIndex((p) => p.id == req.params.idProd);
//   if (index != -1) {
//     carrito.productos.splice(index, 1);
//     await carritosDao.actualizar(carrito);
//   }
//   res.end();
// });
// // TODO: exportar solamente  "carritosRouter"
// module.exports = carritosRouter;

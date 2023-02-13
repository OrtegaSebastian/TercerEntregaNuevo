const { ContenedorMongoDb } = require("../../contenedores/mongoContain");
const {Schema} = require('mongoose')
const logger = require('../../config/log4js')

const ProductosSchema = new Schema({
id_prod: { type: String, required: true },
timestamp: { type: Date, required: true },
nombre: { type: String, required: true },
descripcion: { type: String, required: true },
codigo: { type: String, required: true },
imgUrl: { type: String, required: true },
precio: { type: Number, required: true },
stock: { type: Number, required: true },
});

class CarritoDaoMongoDb extends ContenedorMongoDb {
constructor() {
super("carritos", {
timestamp: { type: Date, required: true },
id_user: { type: String, required: true },
finCompra: { type: Boolean, default: false },
productos: [ProductosSchema],
});
}

async guardaProductos(
id,
id_prod,
timestamp,
nombre,
descripcion,
codigo,
imgUrl,
precio,
stock
) {
try {
const newProduct = new this.col({
id_prod,
timestamp,
nombre,
descripcion,
codigo,
imgUrl,
precio,
stock,
});
await this.col.findByIdAndUpdate(
{ _id: id },
{ $push: { productos: newProduct } }
);
} catch (err) {
logger.error(`Error en Api Carritos: ${err}`);
}
}

async borrarProdporId(id, id_prod) {
try {
await this.col.updateOne(
{ _id: id },
{ $pull: { productos: { id_prod: id_prod } } }
);
} catch (err) {
logger.error(`Error en Api Carritos: ${err}`);
}
}

async getCarritoByUsuario(id) {
try {
const objets = await this.col.findOne({
$and: [{ id_user: id }, { finCompra: false }],
});
return objets;
} catch (err) {
logger.error(`Error en Api Carritos: ${err}`);
}
}
}

module.exports = CarritoDaoMongoDb;


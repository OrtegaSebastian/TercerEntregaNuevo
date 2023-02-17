const fs = require('fs')
const {ContenedorArchivo}= require("../../contenedores/ContenedorArchivo.js")  



class CarritoDaoArchivo extends ContenedorArchivo {
constructor() {
    super("./data/carts.json");
}

async guardaProductos(
    id,
    id_prod,
    timestamp,
    nombre,
    descripcion,
    codigo,
    thumbnail,
    precio,
    stock
) {
    try {
    const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    const carsParse = JSON.parse(cars);
    let encontrado = carsParse.find((car) => car.id === id);
    const index = carsParse.indexOf(encontrado);
    const newProduct = {
        id: id_prod,
        timestamp,
        nombre,
        descripcion,
        codigo,
        thumbnail,
        precio,
        stock,
        categoria
    };
    carsParse[index].productos.push(newProduct);
    const carsString = JSON.stringify(carsParse);
    await fs.promises.writeFile(`${this.archivo}`, carsString);
    } catch (err) {
    console.error(err);
    }
}

async borrarProdporId(id, id_prod) {
    try {
    const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let carsParse = JSON.parse(cars);
    let encontrado = carsParse.find((car) => car.id === id);
    const index = carsParse.indexOf(encontrado);
    carsParse[index].productos = carsParse[index].productos.filter(
        (productos) => productos.id != id_prod
    );
    const carsString = JSON.stringify(carsParse);
    await fs.promises.writeFile(`${this.archivo}`, carsString);
    } catch (err) {
    console.error(err);
    }
}
}

module.exports = CarritoDaoArchivo;


// class CarritosDaoArchivo extends ContenedorArchivo {

//     constructor() {
//         super('carritos.json')
//     }
    
//     async guardar(carrito = { productos: [] }) {
//         return super.guardar(carrito)
//     }
//     }
//     module.exports = CarritosDaoArchivo;
const fs = require('fs')
const {ContenedorArchivo}= require("../../contenedores/ContenedorArchivo.js")  



class CarritoDaoArchivo extends ContenedorArchivo {
constructor() {
    super("./data/carts.json");
}

async saveProducts(
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
    let found = carsParse.find((car) => car.id === id);
    const index = carsParse.indexOf(found);
    const newProduct = {
        id: id_prod,
        timestamp,
        nombre,
        descripcion,
        codigo,
        thumbnail,
        precio,
        stock,
    };
    carsParse[index].products.push(newProduct);
    const carsString = JSON.stringify(carsParse);
    await fs.promises.writeFile(`${this.archivo}`, carsString);
    } catch (err) {
    console.error(err);
    }
}

async deleteProdById(id, id_prod) {
    try {
    const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let carsParse = JSON.parse(cars);
    let found = carsParse.find((car) => car.id === id);
    const index = carsParse.indexOf(found);
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
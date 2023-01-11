const {ContenedorArchivo}= require("../../contenedores/ContenedorArchivo.js")  

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('carritos.json')
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}
module.exports = CarritosDaoArchivo;


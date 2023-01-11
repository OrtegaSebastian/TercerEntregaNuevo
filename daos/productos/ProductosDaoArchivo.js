const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js") 

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.json')
    }
}


module.exports = ProductosDaoArchivo;

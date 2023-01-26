const fs = require('fs')

class ContenedorArchivo {

    constructor(archivo) {
        this.archivo = archivo;
    }

    // constructor(ruta) {
    //     this.ruta = `${config.fileSystem.path}/${ruta}`;
    // }

    async listarAll(id) {
        try{
       const objetos = await fs.promises.readFile(`${this.archivo}`,"utf-8")
       const objetosParse = JSON.parse(objetos)
       return objetosParse
    }catch(error){
        console.log(error)}
    }

    async getById(id){
    try {
        const objetos = await fs.promises.readFile(`${this.archivo}`, "utf-8");
        const objetsParse = JSON.parse(objetos);
        let encontrado = objetsParse.find((objeto) => objeto.id === id);
        if (!encontrado) {
            encontrado = null;
        }
        return encontrado;
        } catch (err) {
        console.error(err);
        }
    }

    async guardar(obj) {
        try {
            const objetos = await fs.promises.readFile(`${this.archivo}`, "utf-8");
            const objetsParse = JSON.parse(objetos);
            const numId = objetsParse.length + 1;
            const nuevoId = numId.toString();
            const nuevoObjeto = { id: nuevoId, ...objetos };
            objetsParse.push(nuevoObjeto);
            const objetsString = JSON.stringify(objetsParse);
            await fs.promises.writeFile(`${this.archivo}`, objetsString);
            return newObjet.id;
        } catch (err) {
        console.error(err);
        }
    }

    async cambiarById(elem) {
        const { id } = elem;
        try {
        const objs = await fs.promises.readFile(this.archivo, "utf-8");
        const objsParse = JSON.parse(objs);
        let findItem = objsParse.find((obj) => obj.id === id);
        if (!findItem) {
        findItem = null;
        } else {
        const filterItem = objsParse.filter((obj) => obj.id != id);
        filterItem.push(elem);
        const objString = JSON.stringify(filterItem);
        await fs.promises.writeFile(this.archivo, objString);
        }
        return findItem;
    } catch (e) {
        console.log(e);
    }
    }

    async borrarById(id) {
    const objets = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let objetsParse = JSON.parse(objets);
    let encontrado = objetsParse.find((objet) => objet.id === id);
    try {
        if (!encontrado) {
        encontrado = null;
        } else {
        objetsParse = objetsParse.filter((objet) => objet.id != id);
        const objetsString = JSON.stringify(objetsParse);
        await fs.promises.writeFile(`${this.archivo}`, objetsString);
        }
        return encontrado;
    } catch (err) {
        console.error(err);
    }
    }
    }
module.exports = {ContenedorArchivo};

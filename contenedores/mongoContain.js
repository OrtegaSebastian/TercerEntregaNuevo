const Config = require("../src/config");

const mongoose = require("mongoose");


class contenedorCarritoMongo {
  // * get, post, put, delete
  // * CRUD
  constructor(collecionCarrito, esquema) {
    this.db = mongoose.model(collecionCarrito, esquema);
  }
  async saveCarrito(newDoc) {
    try {
      const doc = await this.db.create(newDoc);
      return doc;
    } catch (e) {
      throw new Error("carrito no encontrado", e);
    }
  }
  async getAllCarritos() {
    try {
      const data = await this.db.find({});
      return data;
    } catch (e) {
      throw new Error("no se encontro carrito", e);
    }
  }

  async getbyCarritoId(id) {
    try {
      const data = await this.db.findOne({ _id: id });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // * PUT
  async updateCarrito(elem) {
    try {
      this.db.replaceOne({ _id: elem._id }, elem);
      return elem;
    } catch (e) {
      throw new Error(e);
    }
  }
  async borrarCarrito(id) {
    try {
      await this.db.deleteOne({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }
  async borrarTodosCarrito() {
    await this.db.deleteMany({});
  }
}
class contenedorProductosMongo {
  // * get, post, put, delete
  // * CRUD
  constructor(collecionCarrito, esquema) {
    this.db = mongoose.model(collecionCarrito, esquema);
  }
  async saveProd(newDoc) {
    try {
      const doc = await this.db.create(newDoc);
      return doc;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getAllProducts() {
    try {
      const data = await this.db.find({});
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getbyProdId(id) {
    try {
      const data = await this.db.findOne({ _id: id });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // * PUT
  async updateProducto(elem) {
    try {
      this.db.replaceOne({ _id: elem._id }, elem);
      return elem;
    } catch (e) {
      throw new Error(e);
    }
  }
  async borrarProducto(id) {
    try {
      await this.db.deleteOne({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }
  async borrarTodosProductos() {
    await this.db.deleteMany({});
  }
}

class contenedorUsuariosMongo {
  // * get, post, put, delete
  // * CRUD
  constructor(Users, esquema) {
    this.db = mongoose.model(Users, esquema);
  }
  async createUser(newDoc) {
    try {
      const doc = await this.db.create(newDoc);
      return doc;
    } catch (e) {
      throw new Error(e);
    }
  }
  async saveUser(newDoc) {
    try {
      const doc = await this.db.save(newDoc);
      return doc;
    } catch (e) {
      throw new Error(e);
    }
  }
  
  async getbyUserId(id) {
    try {
      const data = await this.db.findOne({ _id: id });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }  


}


module.exports = { contenedorCarritoMongo, contenedorProductosMongo,contenedorUsuariosMongo };



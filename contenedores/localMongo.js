const MongoClient = require('mongodb').MongoClient;

class ContenedorMongoDB {
  constructor(url, databaseName, collectionName) {
    this.url = url;
    this.databaseName = databaseName;
    this.collectionName = collectionName;
    this.client = null;
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(this.url, { useNewUrlParser: true });
    } catch (err) {
      console.error(err);
    }
  }

  async listarAll() {
    try {
      const collection = this.client.db(this.databaseName).collection(this.collectionName);
      const objetosParse = await collection.find({}).toArray();
      return objetosParse;
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    try {
      const collection = this.client.db(this.databaseName).collection(this.collectionName);
      const encontrado = await collection.findOne({ id: id });
      return encontrado;
    } catch (err) {
      console.error(err);
    }
  }

  async guardar(obj) {
    try {
      const collection = this.client.db(this.databaseName).collection(this.collectionName);
      const result = await collection.insertOne(obj);
      return result.insertedId;
    } catch (err) {
      console.error(err);
    }
  }

  async cambiarById(elem) {
    const { id } = elem;
    try {
      const collection = this.client.db(this.databaseName).collection(this.collectionName);
      const result = await collection.replaceOne({ id: id }, elem);
      if (result.modifiedCount === 0) {
        return null;
      } else {
        return elem;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async borrarById(id) {
    try {
      const collection = this.client.db(this.databaseName).collection(this.collectionName);
      const result = await collection.deleteOne({ id: id });
      if (result.deletedCount === 0) {
        return null;
      } else {
        return { id: id };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async close() {
    await this.client.close();
  }
}

module.exports = { ContenedorMongoDB };


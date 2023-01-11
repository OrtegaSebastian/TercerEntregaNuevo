const Config = {
  fileSystem: {
    path: "./DB",
  },
  mongoDB: {
    cnxStr: "mongodb://127.0.0.1/ecommerce",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
};
// TODO: exportat solo el config
module.exports = Config;

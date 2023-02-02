const axios = require('axios');

// Realizar una petición GET para obtener una lista de usuarios
axios.get('http://localhost/sesiones')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

// Realizar una petición POST para crear un nuevo usuario
axios.post('http://localhost/sesiones', {
    username: 'sebas123',
    password: 'password1234',
    nombre: 'sebastian',
    edad: 30,
    lastName: 'Ortega',
    uploaded_file: 'path/to/file.jpg',
    correo: 'sebastian@example.com'
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

// Realizar una petición PUT para actualizar un usuario existente
axios.put('http://localhost/sesiones/1', {
    username: 'sebas123',
    password: 'password456',
    nombre: 'John',
    edad: 31,
    lastName: 'Ortega',
    uploaded_file: 'path/to/file.jpg',
    correo: 'sebastian@example.com'
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

// Realizar una petición DELETE para eliminar un usuario
axios.delete('http://localhost/sesiones/1')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
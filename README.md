README - 

#Uso de Dependencias

Este proyecto utiliza varias dependencias para proporcionar una funcionalidad completa. A continuación, se proporciona una breve descripción de cada dependencia y su uso en la aplicación:

bcrypt: Versión 5.1.0 de la biblioteca para cifrado de contraseñas en Node.js.

connect-mongo: Versión 4.6.0 del módulo de almacenamiento de sesiones de MongoDB para Connect y Express.

crypto-js: Versión 4.1.1 de la biblioteca de cifrado en JavaScript.

dotenv: Versión 16.0.3 de la biblioteca para cargar variables de entorno desde un archivo .env.

engine: Versión 1.0.0 de la biblioteca para definir versiones de motor de plantillas Handlebars en Express.

exphbs: Versión 1.2.0 de la biblioteca de plantillas Handlebars para Express.

express: Versión 4.18.2 del marco de aplicaciones web para Node.js.

express-handlebars: Versión 5.3.0 de la biblioteca de plantillas Handlebars para Express.

express-session: Versión 1.17.3 del módulo de gestión de sesiones para Express.

jsonwebtoken: Versión 9.0.0 de la biblioteca para generación y verificación de tokens de autenticación JWT.

log4js: Versión 6.7.1 de la biblioteca de registro de eventos para Node.js.

mongodb: Versión 4.13.0 del controlador oficial de MongoDB para Node.js.

mongoose: Versión 6.7.5 del ODM para MongoDB en Node.js.

passport: Versión 0.6.0 del middleware de autenticación para Express.

passport-local: Versión 1.0.0 de la estrategia de autenticación para contraseñas locales en Passport.

path: Versión 0.12.7 de la biblioteca para manejar rutas de archivos y directorios en Node.js.

socket.io: Versión 4.6.0 de la biblioteca para WebSockets y comunicación en tiempo real en Node.js.

socket.io-client: Versión 4.6.0 de la biblioteca para el cliente de socket.io.



## Instalación de Dependencias

Para instalar las dependencias necesarias para este proyecto, debes seguir los siguientes pasos:

1. Clona este repositorio en tu computadora: 

git clone https://github.com/OrtegaSebastian/TercerEntregaNuevo.git

2. Entra al directorio del proyecto:

cd TercerEntregaNuevo


3. Instala las dependencias con npm:

npm install


Esto instalará todas las dependencias necesarias para que el proyecto funcione correctamente. Si tienes algún problema con la instalación, asegúrate de tener Node.js y npm instalados correctamente en tu sistema.

Cada dependencia se utiliza para una funcionalidad específica dentro del proyecto, como la autenticación, el cifrado de contraseñas, la gestión de sesiones, el manejo de archivos y directorios.

Es importante asegurarse de tener instaladas todas las dependencias y sus versiones correctas para garantizar el correcto funcionamiento de la aplicación.

Además, se puede encontrar más información sobre cómo utilizar cada una de estas dependencias en sus respectivas documentaciones para este caso recomiendo visitar : 



| Dependencia           | Documentación                                                |
|-----------------------|--------------------------------------------------------------|
| bcrypt                | https://www.npmjs.com/package/bcrypt                          |
| connect-mongo         | https://www.npmjs.com/package/connect-mongo                   |
| crypto-js             | https://www.npmjs.com/package/crypto-js                       |
| dotenv                | https://www.npmjs.com/package/dotenv                          |
| engine                | https://www.npmjs.com/package/engine                          |
| exphbs                | https://www.npmjs.com/package/exphbs                          |
| express               | https://www.npmjs.com/package/express                         |
| express-handlebars    | https://www.npmjs.com/package/express-handlebars              |
| express-session       | https://www.npmjs.com/package/express-session                 |
| jsonwebtoken          | https://www.npmjs.com/package/jsonwebtoken                    |
| log4js                | https://www.npmjs.com/package/log4js                          |
| mongodb               | https://www.npmjs.com/package/mongodb                         |
| mongoose              | https://www.npmjs.com/package/mongoose                        |
| passport              | https://www.npmjs.com/package/passport                        |
| passport-local        | https://www.npmjs.com/package/passport-local                  |
| path                  | https://www.npmjs.com/package/path                            |
| socket.io             | https://www.npmjs.com/package/socket.io                       |
| socket.io-client      | https://www.npmjs.com/package/socket.io-client                |


#Archivo Server.js

El archivo "server.js" es el punto de entrada para una aplicación web escrita en Node.js y Express. Este archivo utiliza varias dependencias para proporcionar una funcionalidad completa.

En primer lugar, se importan los módulos necesarios, incluyendo "express", "dotenv", "http", "express-session", "connect-mongo", "passport", "log4js" y diferentes routers para manejar las distintas rutas de la aplicación.

Luego, se configura la aplicación de Express, definiendo las vistas, el motor de plantillas Handlebars, la carpeta de archivos estáticos y las sesiones y autenticación utilizando Passport.

Se definen las rutas de la aplicación, utilizando diferentes routers para separar el código según su funcionalidad. Además, se manejan las rutas inválidas, redirigiendo a un controlador que registra la ruta inexistente y envía una respuesta con un error.

Se crea un servidor HTTP utilizando el módulo "http" de Node.js. Luego, se establece la conexión con la base de datos utilizando DBConnect de Mongoconf. Si la conexión es exitosa, se inicia el servidor en el puerto especificado en las variables de entorno.

Por último, se inicializa el servidor de Socket.IO y se define un controlador de eventos para manejar las conexiones y desconexiones de los clientes. Socket.IO se utiliza para agregar funcionalidad de chat en tiempo real a la aplicación.


A continuación, se proporciona una breve descripción de cada dependencia y su uso en la aplicación:

express: esta es la dependencia principal de la aplicación. Es un framework web para Node.js que se utiliza para crear servidores web y manejar solicitudes HTTP.

dotenv: esta dependencia se utiliza para cargar las variables de entorno desde un archivo .env, lo que permite que la aplicación se configure fácilmente sin tener que preocuparse por las credenciales, contraseñas y configuraciones específicas de la máquina.

http: este módulo proporciona la capacidad de crear un servidor HTTP en Node.js y se utiliza aquí para crear un servidor para la aplicación.

express-session: esta dependencia se utiliza para manejar la sesión del usuario. Permite almacenar información del usuario en la sesión y mantenerla disponible en solicitudes posteriores.

connect-mongo: esta dependencia se utiliza para almacenar las sesiones de usuario en la base de datos MongoDB.

passport: esta dependencia se utiliza para la autenticación de usuarios. Proporciona una manera fácil de implementar diferentes estrategias de autenticación, como el inicio de sesión local y OAuth.

mongoose: es una biblioteca ORM para Node.js y se utiliza para conectarse y manipular la base de datos MongoDB.

express-handlebars: esta dependencia se utiliza como motor de plantillas para la aplicación. Permite crear páginas HTML dinámicas utilizando plantillas predefinidas y datos proporcionados por el servidor.

log4js: es una biblioteca de registro para Node.js y se utiliza para registrar información sobre el funcionamiento de la aplicación.

socket.io: esta dependencia se utiliza para la funcionalidad de chat en tiempo real. Proporciona una manera fácil de agregar comunicación en tiempo real a la aplicación.

En el archivo de entrada, primero se importan todas las dependencias necesarias y se configura la aplicación de Express. Luego se definen las rutas y se configura el middleware de autenticación y sesión de usuario.

Después, se crea un servidor HTTP con http.createServer y se establece una conexión a la base de datos con DBConnect. Se inicia el servidor y se escucha en el puerto especificado en la variable PORT.

Finalmente, se inicializa socket.io para habilitar la funcionalidad de chat en tiempo real y se configuran los eventos de conexión y desconexión del socket.

Algunas Ayudas para facilitar su prueba, unicamente una vez logueado el usuario, caso contrario no podrá hacerlo :

Código Dummy:

-Productos(http://localhost:8080/productos):
                                        {
                                        "id_prod": 1,
                                        "timestamp": "2023-02-28T15:20:30.000Z",
                                        "nombre": "Producto de ejemplo",
                                        "descripcion": "Este es un producto de ejemplo",
                                        "codigo": "PR-123",
                                        "imgUrl": "https://www.example.com/image.jpg",
                                        "precio": 10.99,
                                        "cantidad": 50,
                                        "categoria": "Electrónica"
                                        }

-Carritos(http://localhost:8080/carrito):
                                       {
                                        "id_user": "63e189701567b5fc9781df90",
                                        "productos": [
                                        {
                                        "id_prod": "001",
                                        "nombre": "Camiseta",
                                        "descripcion": "Camiseta de algodón",
                                        "codigo": "CM001",
                                        "imgUrl": "https://example.com/camiseta.jpg",
                                        "precio": 20.99,
                                        "cantidad": 2,
                                        "categoria": "Ropa"
                                        },
                                        {
                                        "id_prod": "002",
                                        "nombre": "Pantalón",
                                        "descripcion": "Pantalón de mezclilla",
                                        "codigo": "PT001",
                                        "imgUrl": "https://example.com/pantalon.jpg",
                                        "precio": 45.99,
                                        "cantidad": 1,
                                        "categoria": "Ropa"
                                        }
                                        ]
                                        }


-Chat(http://localhost:8080/chat):
        {
        "correo": "usuario123@gmail.com",
        "tipo": "mensaje",
        "cuerpo": "Hola, ¿cómo están?Espero que muy bien",
        }

-Ordenes(http://localhost:8080/ordenes):     






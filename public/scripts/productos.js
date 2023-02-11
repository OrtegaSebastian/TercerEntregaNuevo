const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
let idCarrito;

document.addEventListener("DOMContentLoaded", (e) => {
  fetchUsuario();
  fetchData();
});

//Traer el ID del Usuario
const fetchUsuario = async () => {
  try {
    const res = await fetch("/idUsuario");
    const data = await res.json();
    fetchCarrito(data);
  } catch (error) {
    console.log(error);
  }
};

//Agregar Carrito Nuevo
const fetchAgregarCarrito = async (usuario) => {
  try {
    const res = await fetch(`/api/carrito/${usuario}`, { method: "POST" });
    const data = await res.json();
    idCarrito = data.newId;
    console.log(idCarrito);
  } catch (error) {
    console.log(error);
  }
};

//Traer el ID del Carrito
const fetchCarrito = async (usuario) => {
  try {
    const res = await fetch(`api/carrito/idCarrito/${usuario}`);
    data = await res.json();
    if (data) {
      idCarrito = data;
      console.log(idCarrito);
    } else {
      fetchAgregarCarrito(usuario);
    }
  } catch (error) {
    console.log(error);
  }
};

//Traer Productos de la BD de productos
const fetchData = async () => {
  try {
    const res = await fetch("/api/productos");
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

// Pintar productos
const pintarCards = (data) => {
  data.forEach((item) => {
    templateCard.querySelector("img").setAttribute("src", item.thumbnail);
    templateCard.querySelector("h5").textContent = item.nombre;
    templateCard.querySelector(".descripcion").textContent = item.descripcion;
    templateCard.querySelector(".codigo span").textContent = item.codigo;
    templateCard.querySelector(".time span").textContent = item.timestamp;
    templateCard.querySelector(".precio span").textContent = item.precio;
    templateCard.querySelector(".stock span").textContent = item.stock;
    templateCard.querySelector(".btn-dark").dataset.id = item.id_prod;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-dark")) {
    fetchAgregarProductos(e.target.parentElement);
  }
  e.stopPropagation();
});

//Agregar Productos al Carrito
const fetchAgregarProductos = async (objeto) => {
  console.log("Cargar Producto");
   try {
    let carritoSelect = document.getElementById("cartSelect").value;
    const url = `/api/carrito/${carritoSelect}/productos`;
    const producto = {
      id: idCarrito,
      id_prod: objeto.querySelector(".btn-dark").dataset.id,
      timestamp: objeto.querySelector(".time").textContent,
      nombre: objeto.querySelector("h5").textContent,
      descripcion: objeto.querySelector(".descripcion").textContent,
      codigo: objeto.querySelector(".codigo").textContent,
      imgUrl: objeto.querySelector(".time").textContent,
      precio: objeto.querySelector(".precio span").textContent,
      stock: objeto.querySelector(".stock").textContent,
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.log(error);
  }
};

 















// const logger = require('./helpers/log4js')
// const loggerProd = require('../../helpers/log4js')

// const productosApi = {
//     get: () => {
//         return fetch('/api/productos')
//             .then(data => data.json())
//     },
//     post: (nuevoProd) => {
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(nuevoProd)
//         }
//         return fetch('/api/productos', options)
//     },
//     put: (idProd, nuevoProd) => {
//         const options = {
//             method: 'PUT',
//             body: JSON.stringify(nuevoProd),
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         }
//         return fetch(`/api/productos/${idProd}`, options)
//     },
//     delete: (idProd) => {
//         const options = {
//             method: 'DELETE'
//         }
//         return fetch(`/api/productos/${idProd}`, options)
//     },
// }

// //-------------------------------------------------------------------
// // productos

// actualizarListaProductos()

// const formAgregarProducto = document.getElementById('formAgregarProducto')
// formAgregarProducto.addEventListener('submit', e => {
//     e.preventDefault()
//     const producto = leerProductoDelFormulario()
//     productosApi.post(producto)
//         .then(actualizarListaProductos)
//         .then(() => {
//             formAgregarProducto.reset()
//         })
//         .catch((err) => {
//             alert(err.message)
//         })
// })

// function leerProductoDelFormulario() {
//     const producto = {
//         nombre: formAgregarProducto[0].value,
//         precio: formAgregarProducto[1].value,
//         thumbnail: formAgregarProducto[2].value
//     }
//     return producto
// }

// function actualizarListaProductos() {
//     return productosApi.get()
//         .then(prods => makeHtmlTable(prods))
//         .then(html => {
//             document.getElementById('productos').innerHTML = html
//         })
// }

// function borrarProducto(idProd) {
//     productosApi.delete(idProd)
//         .then(actualizarListaProductos)
// }

// function actualizarProducto(idProd) {
//     const nuevoProd = leerProductoDelFormulario()
//     productosApi.put(idProd, nuevoProd)
//         .then(actualizarListaProductos)
// }


// function llenarFormulario(nombre = '', precio = '', thumbnail = '') {
//     formAgregarProducto[0].value = nombre
//     formAgregarProducto[1].value = precio
//     formAgregarProducto[2].value = thumbnail
// }

// function makeHtmlTable(productos) {
//     let html = `
//         <style>
//             .table td,
//             .table th {
//                 vertical-align: middle;
//             }
//         </style>`

//     if (productos.length > 0) {
//         html += `
//         <h2>Lista de Productos</h2>
//         <div class="table-responsive">
//             <table class="table table-dark">
//                 <tr>
//                     <th>Nombre</th>
//                     <th>Precio</th>
//                     <th>Foto</th>
//                 </tr>`
//         for (const prod of productos) {
//             html += `
//                     <tr>
//                     <td><a type="button" onclick="llenarFormulario('${prod.nombre}', '${prod.precio}','${prod.thumbnail}')" nombre="copiar a formulario...">${prod.nombre}</a></td>
//                     <td>$${prod.precio}</td>
//                     <td><img width="50" src=${prod.thumbnail} alt="not encontrado"></td>
//                     <td><a type="button" onclick="borrarProducto('${prod.id}')">borrar</a></td>
//                     <td><a type="button" onclick="actualizarProducto('${prod.id}')">actualizar</a></td>
//                     </tr>`
//         }
//         html += `
//             </table>
//         </div >`
//     }
//     return Promise.resolve(html)
// }

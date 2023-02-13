
// const prodCarrito = document.getElementById("prodCarrito");

// let idCarrito;

// document.addEventListener("DOMContentLoaded", (e) => {
//   fetchUsuario();
// });

// if (e.target.matches(".list-group-item .btn-danger")) {
//   fetchEliminarProducto(e.target.parentElement);
// }

// selectCarrito.addEventListener("change", () => {
//   pintarCarrito();
// });

// //Traer el ID del Usuario
// const fetchUsuario = async () => {
//   try {
//     const res = await fetch("/idUsuario");
//     const data = await res.json();
//     fetchCarrito(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Traer el ID del Carrito
// const fetchCarrito = async (usuario) => {
//   try {
//     const res = await fetch(`api/carrito/idCarrito/${usuario}`);
//     data = await res.json();
//     idCarrito = data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Traer Productos de un carrito puntual
// const fetchMostrarCarrito = async () => {
//   try {
//     const res = await fetch(`/api/carrito/${idCarrito}/productos`);
//     carritoObjeto = await res.json();
//     pintarProdCarrito();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const agregarProducto = async (producto) => {
//   try {
//     const res = await fetch(`/api/carrito/${idCarrito}/productos`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(producto)
//     });

//     const data = await res.json();

//     if (data.success) {
//       pintarProdCarrito();
//     } else {
//       alert("Hubo un error al agregar el producto al carrito");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

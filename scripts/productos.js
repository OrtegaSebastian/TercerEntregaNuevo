
const productos = require('../daos/productos/ProductosDaoMongoDb') 
const  {ContenedorMongoDb}  = require("../contenedores/mongoContain");
const mongoose = require('mongoose');

const productosContenedor = new ContenedorMongoDb('productos');
const mostrarProductos = () => {
  const select = document.getElementById("seleccionProducto");

  productosContenedor.getAll().then(productos => productos.forEach((producto) => {
      const option = document.createElement("option");
      option.value = producto.codigo;
      option.text = producto.nombre;
      select.add(option);
  }));
};

const getComboA = (select) => {
  productosContenedor.getAll().then(productos => {
      const productoSeleccionado = productos.find(
          (producto) => producto.codigo === select.value,
      );
      const productoInput = document.getElementById("productoComprado");
      productoInput.value = productoSeleccionado.nombre;
  });
};

const cargarCarrito = () => {
  const productoInput = document.getElementById("productoComprado").value;
  const cantidadInput = document.getElementById("cantidadComprada").value;
  const carrito = document.getElementById("carrito");

  productosContenedor.getAll().then(productos => {
      const productoSeleccionado = productos.find(
          (producto) => producto.nombre === productoInput,
      );

      if (!productoSeleccionado) {
          alert("Producto no encontrado");
          return;
      }

      if (productoSeleccionado.stock < cantidadInput) {
          alert("No hay suficiente stock");
          return;
      }

      const fila = document.createElement("tr");

      const columnaProducto = document.createElement("td");
      columnaProducto.innerText = productoInput;

      const columnaCantidad = document.createElement("td");
      columnaCantidad.innerText = cantidadInput;
      let columnaTotal = document.createElement("td");
      columnaTotal.innerText = productoSeleccionado.precio * cantidadInput;

      fila.appendChild(columnaProducto);

      columnaCantidad.innerHTML = cantidadInput; 
      fila.appendChild(columnaCantidad);

      columnaTotal.innerHTML = productoSeleccionado.precio * cantidadInput; 
      fila.appendChild(columnaTotal);

      let columnaBoton = document.createElement("td");
      let boton = document.createElement("button");
      boton.innerHTML = "Eliminar";
      boton.onclick = function () {
          eliminarProducto(productoSeleccionado.nombre); 
      };
      columnaBoton.appendChild(boton);
      fila.appendChild(columnaBoton);

      carrito.appendChild(fila); 
  });
};
const actualizarTotal = () => {
  let total = 0;
  const carrito = document.getElementById("carrito");
  for (let i = 0; i < carrito.children.length; i++) {
      const producto = carrito.children[i];
      const precio = producto.querySelector("[data-precio]").dataset.precio;
      const cantidad = producto.querySelector("[data-cantidad]").value;
      total = total + (precio * cantidad);
  }
  document.getElementById("total").innerText = total;
};
const eventos = () => {
  document.getElementById("seleccionProducto").addEventListener("change", (event) => {
    getComboA(event.target);
  });
  document.getElementById("agregar-producto").addEventListener("click", cargarCarrito);
  document.getElementById("carrito").addEventListener("input", actualizarTotal);
};

eventos();

function eliminarProducto(nombreProducto) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombreProducto) {
      carrito.splice(i, 1);
      break;
    }
  }
  dibujarTabla();
}

const agregarProductoAlCarrito = async (event) => {
  event.preventDefault();
  
  const productoId = event.target.elements.producto_id.value;
  const productoSeleccionado = productos.find((producto) => producto.id === productoId);

  const producto = {
    id_prod: productoId,
    nombre: productoSeleccionado.nombre,
    descripcion: productoSeleccionado.descripcion,
    codigo: productoSeleccionado.codigo,
    imgUrl: productoSeleccionado.imgUrl,
    precio: productoSeleccionado.precio,
    cantidad: 1,
    categoria: productoSeleccionado.categoria,
  };

  try {
    const res = await fetch("/carrito", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: "el_id_del_usuario",
        productos: [producto],
        totalCompra: productoSeleccionado.precio,
        direccion: "la_direccion_del_usuario",
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert("Hubo un error al agregar el producto al carrito");
    } else {
      alert("Producto agregado al carrito");
    }
  } catch (error) {
    console.log(error);
  }
};

window.agregarProductoAlCarrito = agregarProductoAlCarrito;



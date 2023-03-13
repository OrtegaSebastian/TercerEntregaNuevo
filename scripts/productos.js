const productos = require('../daos/productos/ProductosDaoMongoDb');
const { ContenedorMongoDb } = require('../contenedores/mongoContain');
const mongoose = require('mongoose');

const productosContenedor = new ContenedorMongoDb('productos');
const mostrarProductos = () => {
  const select = document.getElementById('seleccionProducto');

  productosContenedor.getAll().then((productos) =>
    productos.forEach((producto) => {
      const option = document.createElement('option');
      option.value = producto.codigo;
      option.text = producto.nombre;
      select.add(option);
    })
  );
};

function agregarProductoAlCarrito(event) {
  event.preventDefault(); // evitar que el formulario se envíe por defecto

  // obtener el ID del producto seleccionado del campo oculto del formulario
  const productoId = event.target.elements.producto_id.value;

  // enviar una solicitud POST al servidor para agregar el producto al carrito
  fetch('/carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ producto_id: productoId })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // hacer algo con la respuesta del servidor, si se desea
  })
  .catch(error => console.error(error));
}

const getComboA = (select) => {
  productosContenedor.getAll().then((productos) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.codigo === select.value
    );
    const productoInput = document.getElementById('productoComprado');
    productoInput.value = productoSeleccionado.nombre;
  });
};

const carrito = [];

const cargarCarrito = () => {
  const productoInput = document.getElementById('productoComprado').value;
  const cantidadInput = document.getElementById('cantidadComprada').value;
  const carrito = document.getElementById('carrito');

  productosContenedor.getAll().then((productos) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.nombre === productoInput
    );

    if (!productoSeleccionado) {
      alert('Producto no encontrado');
      return;
    }

    if (productoSeleccionado.stock < cantidadInput) {
      alert('No hay suficiente stock');
      return;
    }

    const itemIndex = carrito.findIndex(
      (item) => item.nombre === productoSeleccionado.nombre
    );

    if (itemIndex > -1) {
      carrito[itemIndex].cantidad += parseInt(cantidadInput);
      carrito[itemIndex].total =
        carrito[itemIndex].cantidad * productoSeleccionado.precio;
    } else {
      const item = {
        nombre: productoSeleccionado.nombre,
        cantidad: parseInt(cantidadInput),
        precio: productoSeleccionado.precio,
        total: parseInt(cantidadInput) * productoSeleccionado.precio,
      };

      carrito.push(item);
    }

    dibujarTabla();
  });
};

const actualizarTotal = () => {
  let total = 0;
  carrito.forEach((item) => {
    total += item.total;
  });
  document.getElementById('total').innerText = total;
};

const eventos = () => {
  document
    .getElementById('seleccionProducto')
    .addEventListener('change', (event) => {
      getComboA(event.target);
    });
  document
    .getElementById('agregar-producto')
    .addEventListener('click', cargarCarrito);
  document.getElementById('carrito').addEventListener('input', actualizarTotal);
};

eventos();

function eliminarProducto(nombreProducto) {
  const carrito = document.getElementById("carrito");
  for (let i = 0; i < carrito.children.length; i++) {
    const producto = carrito.children[i];
    const nombre = producto.querySelector("[data-nombre]").dataset.nombre;
    if (nombre === nombreProducto) {
      carrito.removeChild(producto);
      break;
    }
  }
  actualizarTotal();
}

const dibujarTabla = (productos) => {
  const carrito = document.getElementById("carrito");
  carrito.innerHTML = "";
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    const fila = document.createElement("tr");

    const columnaProducto = document.createElement("td");
    columnaProducto.setAttribute("data-nombre", producto.nombre);
    columnaProducto.innerHTML = producto.nombre;

    const columnaCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.setAttribute("type", "number");
    inputCantidad.setAttribute("min", "1");
    inputCantidad.setAttribute("value", producto.cantidad);
    inputCantidad.setAttribute("data-cantidad", "");
    columnaCantidad.appendChild(inputCantidad);

    const columnaPrecio = document.createElement("td");
    columnaPrecio.innerHTML = `$${producto.precio}`;
    columnaPrecio.setAttribute("data-precio", producto.precio);

    const columnaTotal = document.createElement("td");
    columnaTotal.innerHTML = `$${producto.precio * producto.cantidad}`;

    const columnaEliminar = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      eliminarProducto(producto.nombre);
    });
    columnaEliminar.appendChild(botonEliminar);

    fila.appendChild(columnaProducto);
    fila.appendChild(columnaCantidad);
    fila.appendChild(columnaPrecio);
    fila.appendChild(columnaTotal);
    fila.appendChild(columnaEliminar);

    carrito.appendChild(fila);
  }
  actualizarTotal();
};



obtenerProductosCarrito();function eliminarProducto(nombreProducto) {
  const carrito = document.getElementById("carrito");
  for (let i = 0; i < carrito.children.length; i++) {
    const producto = carrito.children[i];
    const nombre = producto.querySelector("[data-nombre]").dataset.nombre;
    if (nombre === nombreProducto) {
      carrito.removeChild(producto);
      break;
    }
  }
  actualizarTotal();
}

const obtenerProductosCarrito = async () => {
  try {
    const res = await fetch("/carrito");
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
    } else {
      dibujarTabla(data.productos);
    }
  } catch (error) {
    console.log(error);
  }
};

obtenerProductosCarrito();
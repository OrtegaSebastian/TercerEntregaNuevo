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

const getProductoPorCodigo = (codigo) => {
  return productosContenedor.getById(codigo);
};

const agregarProductoAlCarrito = async (event) => {
  event.preventDefault(); // evitar que el formulario se envíe por defecto

  // obtener el ID del producto seleccionado del campo oculto del formulario
  const productoId = event.target.elements.producto_id.value;

  const producto = await getProductoPorCodigo(productoId);

  if (!producto) {
    alert('Producto no encontrado');
    return;
  }

  if (producto.stock < 1) {
    alert('No hay suficiente stock');
    return;
  }

  const productoCarrito = {
    codigo: producto.codigo,
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: 1,
    total: producto.precio,
  };

  await agregarProducto(productoCarrito);
};

const getComboA = (select) => {
  productosContenedor.getAll().then((productos) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.codigo === select.value
    );
    const productoInput = document.getElementById('productoComprado');
    productoInput.value = productoSeleccionado.nombre;
  });
};

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
        codigo: productoSeleccionado.codigo,
        nombre: productoSeleccionado.nombre,
        cantidad: parseInt(cantidadInput),
        precio: productoSeleccionado.precio,
        total: parseInt(cantidadInput) * productoSeleccionado.precio,
      };

      agregarProducto(item);
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
    .addEventListener('click', agregarProductoAlCarrito);
  document
    .getElementById('cargar-carrito')
    .addEventListener('click', cargarCarrito);
};

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  eventos();
});

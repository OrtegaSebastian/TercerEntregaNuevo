// función que se ejecuta al cargar la página de carrito
export function cargarCarrito() {
  // enviar petición GET para obtener información del carrito
  fetch('/carrito')
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert('Ocurrió un error al cargar el carrito');
    } else {
      // mostrar información del carrito en el front-end
      const carritoTable = document.querySelector('#carrito-table');
      carritoTable.innerHTML = ''; // vaciar contenido actual de la tabla
      let totalCompra = 0;

      data.productos.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
        carritoTable.innerHTML += `
          <tr>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.codigo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>
            <td>
              <button onclick="eliminarProductoDelCarrito('${producto.id}')">Eliminar</button>
            </td>
          </tr>
        `;
      });

      // mostrar total de la compra
      const totalCompraSpan = document.querySelector('#total-compra');
      totalCompraSpan.innerText = totalCompra;
    }
  })
  .catch(err => console.error(err));
}

// función que se ejecuta al enviar el formulario de comprar carrito
export function comprarCarrito(event) {
  event.preventDefault(); // prevenir comportamiento default del formulario

  const form = event.target; // obtener formulario enviado
  const direccion = form.direccion.value; // obtener dirección de envío

  // enviar petición POST para comprar el carrito
  fetch('/carrito/comprar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({direccion: direccion})
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert('Ocurrió un error al comprar el carrito');
    } else {
      alert('Compra realizada con éxito!');
      cargarCarrito(); // volver a cargar el carrito para mostrar que está vacío
    }
  })
  .catch(err => console.error(err));
}

// función
// Manejar el evento del botón "Eliminar" en la tabla de productos del carrito
export function eliminarProductoDelCarrito(event) {
  event.preventDefault();
  
  const productoId = event.target.dataset.productoId;
  
  fetch(`/carrito/${productoId}`, { method: "DELETE" })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Actualizar la tabla de productos del carrito en el frontend
      mostrarProductosEnCarrito(data.productos);
      // Actualizar la cantidad de productos en el botón del carrito
      actualizarCantidadProductosEnCarrito(data.productos);
    })
    .catch(error => {
      console.error(error);
    });
}

// Manejar el evento del botón "Comprar" en el carrito
export function comprarProductos(event) {
  event.preventDefault();
  
  const direccion = document.getElementById("direccion").value;
  
  fetch("/carrito/comprar", { method: "POST", body: JSON.stringify({ direccion }) })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert(`Compra realizada con éxito! ID de la orden: ${data.ordenId}`);
      // Redirigir al usuario a la página principal
      window.location.href = "/";
    })
    .catch(error => {
      console.error(error);
    });
}

// Función que muestra los productos en la tabla del carrito
export function mostrarProductosEnCarrito(productos) {
  const tablaProductos = document.getElementById("tabla-productos");
  
  let html = "";
  
  productos.forEach(producto => {
    html += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.codigo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td><img src="${producto.imgUrl}" alt="Imagen del producto"></td>
        <td><button class="btn btn-danger btn-sm" data-producto-id="${producto.id}" onclick="eliminarProductoDelCarrito(event)">Eliminar</button></td>
      </tr>
    `;
  });
  
  tablaProductos.innerHTML = html;
}

// Función que actualiza la cantidad de productos en el botón del carrito
function actualizarCantidadProductosEnCarrito(productos) {
  const cantidadProductos = productos.reduce((total, producto) => total + producto.cantidad, 0);
  
  const botonCarrito = document.getElementById("boton-carrito");
  botonCarrito.innerHTML = `Carrito (${cantidadProductos})`;
}

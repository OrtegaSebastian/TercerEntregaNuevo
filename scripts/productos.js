// función que se ejecuta al enviar el formulario de agregar al carrito
export function agregarProductoAlCarrito(event) {
  event.preventDefault(); // prevenir comportamiento default del formulario

  const form = event.target; // obtener formulario enviado
  const productoId = form.producto_id.value; // obtener ID del producto
  const cantidad = form.cantidad.value; // obtener cantidad de producto

  // enviar petición POST para agregar producto al carrito
  fetch('/carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({producto_id: productoId, cantidad: cantidad})
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert('Ocurrió un error al agregar el producto al carrito');
    } else {
      alert('Producto agregado al carrito!');
    }
  })
  .catch(err => console.error(err));
}

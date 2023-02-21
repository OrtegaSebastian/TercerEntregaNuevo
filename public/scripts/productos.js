window.agregarProductoAlCarrito = agregarProductoAlCarrito;

const mostrarProductos = () => {
    const select = document.getElementById("seleccionProducto");

    productos.forEach((producto) => {
        const option = document.createElement("option");
        option.value = producto.codigo;
        option.text = producto.nombre;
        select.add(option);
    });
};

const getComboA = (select) => {
    const productoSeleccionado = productos.find(
        (producto) => producto.codigo === select.value,
    );
    const productoInput = document.getElementById("productoComprado");
    productoInput.value = productoSeleccionado.nombre;
};

const cargarCarrito = () => {
    const productoInput = document.getElementById("productoComprado").value;
    const cantidadInput = document.getElementById("cantidadComprada").value;
    const carrito = document.getElementById("carrito");

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

    columnaCantidad.innerHTML = producto.cantidad;
    fila.appendChild(columnaCantidad);

    columnaTotal.innerHTML = producto.total;
    fila.appendChild(columnaTotal);

    let columnaBoton = document.createElement("td");
    let boton = document.createElement("button");
    boton.innerHTML = "Eliminar";
    boton.onclick = function () {
        eliminarProducto(producto.nombre);
    };
    columnaBoton.appendChild(boton);
    fila.appendChild(columnaBoton);

    tablaCarrito.appendChild(fila);
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
    document.getElementById("agregar-producto").addEventListener(
        "click",
        agregarProducto,
    );
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

const agregarProductoAlCarrito = async () => {
    const productoInput = document.getElementById("productoComprado").value;
    const cantidadInput = document.getElementById("cantidadComprada").value;

    const productoSeleccionado = productos.find(
        (producto) => producto.nombre === productoInput,
    );

    const producto = {
        nombre: productoInput,
        cantidad: cantidadInput,
        total: productoSeleccionado.precio * cantidadInput,
    };

    try {
        const res = await fetch("/api/carrito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        const data = await res.json();

        if (data.success) {
            alert("Producto agregado al carrito");
        } else {
            alert("Hubo un error al agregar el producto al carrito");
        }
    } catch (error) {
        console.log(error);
    }
};
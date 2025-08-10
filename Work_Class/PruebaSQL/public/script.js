document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombre");
    const precioInput = document.getElementById("precio");
    const productoIdInput = document.getElementById("productoId");
    const agregarBtn = document.getElementById("agregarBtn");
    const cancelarBtn = document.getElementById("cancelarEdicionBtn");
    const tabla = document.getElementById("tabla");

    const cargarProductos = async () => {
        const respuesta = await fetch("/productos");
        const productos = await respuesta.json();

        tabla.innerHTML = "";
        productos.forEach(producto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                    <button onclick="editarProducto(${producto.id}, '${producto.nombre}', ${producto.precio})">Editar</button>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    };

    agregarBtn.addEventListener("click", async () => {
        const nombre = nombreInput.value.trim();
        const precio = parseFloat(precioInput.value);
        const id = productoIdInput.value;

        if (!nombre || isNaN(precio)) return alert("Completa todos los campos correctamente.");

        const datos = { nombre, precio };

        if (id) {
            // Actualizar
            await fetch(`/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
        } else {
            // Crear
            await fetch("/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
        }

        limpiarFormulario();
        cargarProductos();
    });

    cancelarBtn.addEventListener("click", () => {
        limpiarFormulario();
    });

    window.editarProducto = (id, nombre, precio) => {
        productoIdInput.value = id;
        nombreInput.value = nombre;
        precioInput.value = precio;
        agregarBtn.textContent = "Actualizar";
        cancelarBtn.style.display = "inline";
    };

    window.eliminarProducto = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

        await fetch(`/productos/${id}`, { method: "DELETE" });
        cargarProductos();
    };

    const limpiarFormulario = () => {
        productoIdInput.value = "";
        nombreInput.value = "";
        precioInput.value = "";
        agregarBtn.textContent = "Agregar";
        cancelarBtn.style.display = "none";
    };

    cargarProductos();
});

document.getElementById("subirArchivoBtn").addEventListener("click", () => {
    const archivo = document.getElementById("archivo").files[0];
    if (!archivo) {
        alert("Selecciona un archivo");
        return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);

    fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        cargarProductos();
    })
    .catch(err => console.error(err));
});


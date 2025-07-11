// views/productos.js

import { obtenerUsuarioActivo } from '../utils/auth.js';
import { agregarAListaLocal, eliminarDeListaLocalPorId } from '../utils/storage.js';

export async function mostrarVistaProductos() {
  const app = document.getElementById('app');
  const usuario = obtenerUsuarioActivo();

  if (!usuario || usuario.role !== 'admin') {
    app.innerHTML = `<p style="color:red;">Acceso denegado. Solo los administradores pueden ver esta página.</p>`;
    return;
  }

  let modoEdicion = false;
  let productoEditarId = null;

  const [productosRes, categoriasRes] = await Promise.all([
    fetch('http://localhost:3000/products'),
    fetch('http://localhost:3000/categories')
  ]);

  const productos = await productosRes.json();
  const categorias = await categoriasRes.json();

  const opciones = categorias.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');

  const filas = productos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>${p.categoria}</td>
      <td>
        <button class="editar" data-id="${p.id}">✏️</button>
        <button class="eliminar" data-id="${p.id}">🗑️</button>
      </td>
    </tr>
  `).join('');

  app.innerHTML = `
    <h2>Gestión de Productos</h2>
    <form id="form-producto">
      <input type="text" name="nombre" placeholder="Nombre del producto" required />
      <input type="number" name="precio" placeholder="Precio" required />
      <select name="categoria" required>${opciones}</select>
      <button type="submit" id="btn-formulario">Agregar</button>
    </form>
    <table>
      <thead>
        <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Acciones</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
  `;

  const form = document.getElementById('form-producto');
  const btnFormulario = document.getElementById('btn-formulario');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const nombre = form.nombre.value;
    const precio = parseFloat(form.precio.value);
    const categoria = form.categoria.value;

    if (!modoEdicion) {
      const nuevoProducto = { nombre, precio, categoria };

      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      const productoCreado = await res.json();
      agregarAListaLocal('productos', productoCreado);

    } else {
      const productoActualizado = { nombre, precio, categoria };

      await fetch(`http://localhost:3000/products/${productoEditarId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
      });

      modoEdicion = false;
      productoEditarId = null;
      if (btnFormulario) btnFormulario.textContent = 'Agregar';
    }

    form.reset();
    mostrarVistaProductos();
  });

  document.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.dataset.id);
      await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
      eliminarDeListaLocalPorId('productos', id);
      mostrarVistaProductos();
    });
  });

  document.querySelectorAll('.editar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const res = await fetch(`http://localhost:3000/products/${id}`);

      if (!res.ok) {
        alert('Error: el producto no existe.');
        return;
      }

      const producto = await res.json();

      form.nombre.value = producto.nombre;
      form.precio.value = producto.precio;
      form.categoria.value = producto.categoria;

      modoEdicion = true;
      productoEditarId = id;
      if (btnFormulario) btnFormulario.textContent = 'Actualizar';
    });
  });
}

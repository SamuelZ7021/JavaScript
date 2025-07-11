// views/productos_cliente.js

import { obtenerUsuarioActivo } from '../utils/auth.js';

export async function mostrarVistaProductosCliente() {
  const app = document.getElementById('app');
  const usuario = obtenerUsuarioActivo();

  if (!usuario || usuario.role !== 'cliente') {
    app.innerHTML = `<p style="color:red;">Acceso denegado. Solo los clientes pueden ver esta página.</p>`;
    return;
  }

  const res = await fetch('http://localhost:3000/products');
  const productos = await res.json();

  const filas = productos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>${p.categoria}</td>
    </tr>
  `).join('');

  app.innerHTML = `
    <h2>Catálogo de Productos</h2>
    <p>Explora los productos disponibles:</p>
    <table>
      <thead>
        <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
    <br>
    <a href="#home">Volver al inicio</a>
  `;
} 

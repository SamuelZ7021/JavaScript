// views/home.js

import { obtenerUsuarioActivo, cerrarSesion } from '../utils/auth.js';

export function mostrarVistaHome() {
  const usuario = obtenerUsuarioActivo();
  const app = document.getElementById('app');

    // Si no hay sesión activa, mostrar info general
  if (!usuario) {
    location.hash = 'home'
    app.innerHTML = `
      <h2>Bienvenido a nuestra tienda de productos</h2>
      <p>En esta tienda puedes ver productos de tu interes</p>
      <ul>
        <li>Registrarte como cliente</li>
        <li>Iniciar sesión y ver contenido</li>
        <li>Los clientes pueden ver el catálogo disponible</li>
      </ul>
      <p>Para continuar, por favor <a href="#login">inicia sesión</a> o <a href="#registro">regístrate</a>.</p>
    `;
    return;
  }

  // Contenido base
  let contenido = `
    <h2>Bienvenido, ${usuario.username}</h2>
    <p>Rol: <strong>${usuario.role}</strong></p>
  `;

  // Contenido extra según rol
  if (usuario.role === 'admin') {
    contenido += `
      <p>Como administrador, puedes gestionar los productos del sistema.</p>
      <a href="#productos">Ir a gestión de productos</a>
    `;
  } else if (usuario.role === 'cliente') {
    contenido += `
      <p>Gracias por iniciar sesión. Puedes ver el catálogo de productos a continuación:</p>
      <a href="#productos-cliente">Catalogo</a>
    `;
  }

  // Botón cerrar sesión
  contenido += `
    <br><br>
    <button id="cerrar-sesion">Cerrar sesión</button>
  `;

  app.innerHTML = contenido;

  document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);
}

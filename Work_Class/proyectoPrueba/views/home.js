// views/home.js

import { obtenerUsuarioActivo, cerrarSesion } from '../utils/auth.js';

export function mostrarVistaHome() {
  const usuario = obtenerUsuarioActivo();

  // Si no hay usuario logueado, redirige al login
  if (!usuario) {
    location.hash = 'login';
    return;
  }

  const app = document.getElementById('app');

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
      <a href="#productos-cliente">Ver productos</a>
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

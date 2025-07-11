// views/registro.js

import { agregarAListaLocal } from '../utils/storage.js';

export function mostrarVistaRegistro() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <form id="registro-form">
      <h2>Registro de Usuario</h2>
      <input type="text" name="username" placeholder="Nombre de usuario" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <select name="role" required>
        <option value="">Seleccione un rol</option>
        <option value="admin">Admin</option>
        <option value="cliente">Cliente</option>
      </select>
      <button type="submit">Registrar</button>
      <p id="mensaje-registro" style="color: red;"></p>
    </form>
  `;

  const form = document.getElementById('registro-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;
    const role = form.role.value;

    if (!username || !password || !role) {
      document.getElementById('mensaje-registro').textContent = 'Todos los campos son obligatorios.';
      return;
    }

    try {
      // Verificar si el usuario ya existe
      const resCheck = await fetch(`http://localhost:3000/users?username=${username}`);
      const usuarios = await resCheck.json();

      if (usuarios.length > 0) {
        document.getElementById('mensaje-registro').textContent = 'Ese nombre de usuario ya está registrado.';
        return;
      }

      const nuevoUsuario = { username, password, role };

      // Guardar en JSON Server
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });

      const usuarioGuardado = await res.json();

      // Guardar también en localStorage
      agregarAListaLocal('usuarios', usuarioGuardado);

      alert('Usuario registrado con éxito.');
      location.hash = 'login';
    } catch (error) {
      document.getElementById('mensaje-registro').textContent = 'Error al registrar. Intenta más tarde.';
    }
  });
}
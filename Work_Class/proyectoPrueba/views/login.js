// views/login.js

import { guardarEnLocal, leerDesdeLocal } from '../utils/storage.js';
import { campoNoVacio, respuestaOk } from '../utils/validation.js';

export function mostrarVistalogin() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <form id="login-form">
      <h2>Iniciar Sesión</h2>
      <input type="text" name="username" placeholder="Usuario" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
      <p id="mensaje-login" style="color: red;"></p>
    </form>
  `;

  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const intentosKey = `intentos_${username}`;
    let intentos = leerDesdeLocal(intentosKey) || 0;

    if (!campoNoVacio(username) || !campoNoVacio(password)) {
      document.getElementById('mensaje-login').textContent = 'Por favor completa todos los campos.';
      return;
    }

    if (intentos >= 3) {
      document.getElementById('mensaje-login').textContent = 'Demasiados intentos fallidos. Intenta más tarde.';
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      if (!respuestaOk(res)) throw new Error('Fallo la conexión con el servidor.');

      const usuarios = await res.json();
      if (usuarios.length === 0) {
        intentos++;
        guardarEnLocal(intentosKey, intentos);
        document.getElementById('mensaje-login').textContent = `Credenciales inválidas. Intento ${intentos}/3.`;
        return;
      }

      const usuario = usuarios[0];
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      guardarEnLocal('ultimoLogin', usuario.username);
      guardarEnLocal(intentosKey, 0); // Reiniciar contador al éxito

      location.hash = 'home';
    } catch (error) {
      document.getElementById('mensaje-login').textContent = 'Error al iniciar sesión.';
    }
  });
}

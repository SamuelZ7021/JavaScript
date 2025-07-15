import { guardarEnLocal, leerDesdeLocal } from '../utils/storage.js'; // Import functions for localStorage operations
import { campoNoVacio, respuestaOk } from '../utils/validation.js'; // Import validation functions

export function mostrarVistalogin() {
  const app = document.getElementById('app'); // Get the main app container

  // Render the login form
  app.innerHTML = `
    <form id="login-form">
      <h2>Iniciar Sesión</h2>
      <input type="text" name="username" placeholder="Usuario" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
      <p id="mensaje-login" style="color: red;"></p>
    </form>
  `;

  const form = document.getElementById('login-form'); // Get the form element

  form.addEventListener('submit', async (e) => { // Listen for form submission
    e.preventDefault(); // Prevent default form submission

    const username = form.username.value.trim(); // Get and trim username
    const password = form.password.value.trim(); // Get and trim password
    const intentosKey = `intentos_${username}`; // Key for tracking failed attempts
    let intentos = leerDesdeLocal(intentosKey) || 0; // Get failed attempts from localStorage

    // Validate that both fields are filled
    if (!campoNoVacio(username) || !campoNoVacio(password)) {
      document.getElementById('mensaje-login').textContent = 'Por favor completa todos los campos.';
      return;
    }

    // Block login after 3 failed attempts
    if (intentos >= 3) {
      document.getElementById('mensaje-login').textContent = 'Demasiados intentos fallidos. Intenta más tarde.';
      return;
    }

    try {
      // Send GET request to check credentials
      const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      if (!respuestaOk(res)) throw new Error('Fallo la conexión con el servidor.');

      const usuarios = await res.json(); // Parse response as JSON
      if (usuarios.length === 0) {
        intentos++; // Increment failed attempts
        guardarEnLocal(intentosKey, intentos); // Save failed attempts
        document.getElementById('mensaje-login').textContent = `Credenciales inválidas. Intento ${intentos}/3.`;
        return;
      }

      const usuario = usuarios[0]; // Get the authenticated user
      sessionStorage.setItem('usuario', JSON.stringify(usuario)); // Save user to sessionStorage
      guardarEnLocal('ultimoLogin', usuario.username); // Save last login username
      guardarEnLocal(intentosKey, 0); // Reset failed attempts on success

      location.hash = 'dashboard'; // Redirect to dashboard
    } catch (error) {
      document.getElementById('mensaje-login').textContent = 'Error al iniciar sesión.'; // Show error message
    }
  });
}

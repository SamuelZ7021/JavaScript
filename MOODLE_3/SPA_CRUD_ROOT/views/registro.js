import { agregarAListaLocal } from '../utils/storage.js'; // Import function to add user to localStorage
import { validarRegistro, respuestaOk } from '../utils/validation.js'; // Import validation and response check functions

export function mostrarVistaRegistro() {
  const app = document.getElementById('app'); // Get the main app container

  // Render the registration form
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

  const form = document.getElementById('registro-form'); // Get the form element

  form.addEventListener('submit', async (e) => { // Listen for form submission
    e.preventDefault(); // Prevent default form submission

    const username = form.username.value.trim(); // Get and trim username
    const password = form.password.value.trim(); // Get and trim password
    const role = form.role.value; // Get selected role

    const newUser = { username, password, role }; // Create new user object

    // Validate registration fields
    if (!validarRegistro(newUser)) {
      document.getElementById('mensaje-registro').textContent = 'Por favor completa todos los campos correctamente.';
      return;
    }

    try {
      // Check if username already exists
      const resCheck = await fetch(`http://localhost:3000/users?username=${username}`);
      const users = await resCheck.json();

      if (users.length > 0) {
        document.getElementById('mensaje-registro').textContent = 'Ese nombre de usuario ya está registrado.';
        return;
      }

      // Send POST request to register the new user
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      // Check if registration was successful
      if (respuestaOk(res)) {
        const userGuardado = await res.json(); // Get saved user from response
        agregarAListaLocal('users', userGuardado); // Add user to localStorage
        alert('Usuario registrado con éxito.');
        location.hash = 'login'; // Redirect to login
      } else {
        document.getElementById('mensaje-registro').textContent = 'Error al registrar. Intenta más tarde.';
      }

    } catch (error) {
      document.getElementById('mensaje-registro').textContent = 'Error inesperado en el registro.';
    }
  });
}

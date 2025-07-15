import { obtenerUsuarioActivo } from '../utils/auth.js'; // Import function to get the active user
import { respuestaOk } from '../utils/validation.js'; // Import function to validate HTTP response

export async function mostrarVistaEditarEvento() {
  const app = document.getElementById('app'); // Get the main app container
  const usuario = obtenerUsuarioActivo(); // Get the current user

  // Check if the user is not logged in or not an admin
  if (!usuario || usuario.role !== 'admin') {
    app.innerHTML = '<p style="color:red;">Access denied. Only administrators can edit events.</p>';
    return; // Stop execution if not authorized
  }

  // Get event ID from URL hash parameters
  const parametros = new URLSearchParams(window.location.hash);
  const id = parametros.get('id');
  if (!id) {
    app.innerHTML = '<p>Event not specified.</p>';
    return; // Stop if no event ID is provided
  }

  try {
    // Fetch event data from the server
    const res = await fetch(`http://localhost:3000/event/${id}`);
    if (!respuestaOk(res)) throw new Error('Not found');
    const evento = await res.json();

    // Render the event edit form with current event data
    app.innerHTML = `
      <h2>Edit Event</h2>
      <form id="form-editar">
        <input type="text" name="nombre" value="${evento.nombre}" required />
        <textarea name="descripcion" required>${evento.descripcion}</textarea>
        <input type="number" name="cupo" value="${evento.cupo}" min="1" required />
        <input type="date" name="fecha" value="${evento.fecha}" required />
        <button type="submit">Update</button>
      </form>
      <a href="#dashboard/events"><button>Back</button></a>
    `;

    const form = document.getElementById('form-editar'); // Get the form element
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission

      // Create updated event object from form values
      const eventoActualizado = {
        nombre: form.nombre.value.trim(),
        descripcion: form.descripcion.value.trim(),
        cupo: parseInt(form.cupo.value),
        fecha: form.fecha.value
      };

      // Validate event fields before sending
      if (!validarEvento(eventoActualizado)) {
        alert('Please complete all fields correctly.');
        return;
      }

      // Send PUT request to update the event
      const resUpdate = await fetch(`http://localhost:3000/event/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(eventoActualizado)
      });

      // Check if the update was successful
      if (respuestaOk(resUpdate)) {
        alert('Event updated successfully');
        location.hash = 'dashboard/events'; // Redirect to events dashboard
      } else {
        alert('Error updating the event.');
      }
    });

  } catch (error) {
    app.innerHTML = '<p style="color:red;">Error loading the event.</p>';
    console.error(error); // Log error to console
  }
}
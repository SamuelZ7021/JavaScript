import { obtenerUsuarioActivo } from '../utils/auth.js'; // Import function to get the active user
import { respuestaOk } from '../utils/validation.js'; // Import function to validate HTTP response

export async function mostrarVistaEventosAdmin() {
  const app = document.getElementById('app'); // Get the main app container
  const usuario = obtenerUsuarioActivo(); // Get the current user

  // Check if the user is not logged in or not an admin
  if (!usuario || usuario.role !== 'admin') {
    app.innerHTML = '<p style="color:red;">Access denied. Only administrators can view this section.</p>';
    return; // Stop execution if not authorized
  }

  try {
    // Fetch all events from the server
    const res = await fetch('http://localhost:3000/event');
    if (!respuestaOk(res)) throw new Error('Error loading events');

    const eventos = await res.json(); // Parse events data

    // Generate table rows for each event
    const filas = eventos.map(e => 
      `<tr>
        <td>${e.id}</td>
        <td>${e.nombre}</td>
        <td>${e.descripcion}</td>
        <td>${e.cupo}</td>
        <td>${e.fecha}</td>
        <td>
          <button class="editar" data-id="${e.id}">✏️</button> <!-- Edit button -->
          <button class="eliminar" data-id="${e.id}">🗑️</button> <!-- Delete button -->
        </td>
      </tr>`
    ).join('');

    // Render the events management table
    app.innerHTML = `
      <h2>Event Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Capacity</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
      <br>
      <a href="#dashboard"><button>Back</button></a>
    `;

    // Add click event to all delete buttons
    document.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id; // Get event ID
        const confirmar = confirm('Are you sure you want to delete this event?');
        if (!confirmar) return;

        // Send DELETE request to remove the event
        const resDel = await fetch(`http://localhost:3000/event/${id}`, { method: 'DELETE' });
        if (respuestaOk(resDel)) {
          alert('Event deleted');
          mostrarVistaEventosAdmin(); // Reload the view
        } else {
          alert('Error deleting the event.');
        }
      });
    });

    // Add click event to all edit buttons
    document.querySelectorAll('.editar').forEach(btn => { 
      btn.addEventListener('click', () => {
        const id = btn.dataset.id; // Get event ID
        location.hash = `dashboard/events/edit?id=${id}`; // Redirect to edit event view
      });
    });

  } catch (error) {
    app.innerHTML = '<p style="color:red;">Error loading events.</p>';
    console.error(error); // Log error to console
  }
}
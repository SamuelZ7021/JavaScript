import { obtenerUsuarioActivo } from '../utils/auth.js'; // Import function to get the active user
import { respuestaOk } from '../utils/validation.js'; // Import function to validate HTTP response

export async function mostrarVistaMisEventos() {
  const app = document.getElementById('app'); // Get the main app container
  const user = obtenerUsuarioActivo(); // Get the current user

   // Check if the user is not logged in or is a visitor
   if (!user || user.role === 'visitante') {
     app.innerHTML = '<p style="color:red;">Access denied. Only registered users can access.</p>';
     return;
  }

  try {
    // Fetch all events and user's registrations in parallel
    const [resEventos, resInscripciones] = await Promise.all([
      fetch('http://localhost:3000/event'),
      fetch(`http://localhost:3000/inscripciones?userId=${user.id}`)
    ]);

    // Check if both responses are OK
    if (!respuestaOk(resEventos) || !respuestaOk(resInscripciones)) {
      throw new Error('Error loading data');
    }

    const eventos = await resEventos.json(); // Parse events data
    const inscripciones = await resInscripciones.json(); // Parse registrations data
    const eventosInscritos = inscripciones.map(i => i.eventId); // Get IDs of events the user is registered for

    // Generate table rows for each event
    const filas = eventos.map(evento => {
      const inscrito = eventosInscritos.includes(evento.id); // Check if user is registered
      const puedeInscribirse = evento.cupo < 100 && !inscrito; // Check if user can register

      return`
        <tr>
          <td>${evento.nombre}</td>
          <td>${evento.descripcion}</td>
          <td>${evento.cupo}</td>
          <td>${evento.fecha}</td>
          <td>
            ${inscrito ? '✅ Inscrito' : puedeInscribirse
              ? `<button class="inscribirse" data-id="${evento.id}">Inscribirse</button>`
              : '❌ Sin cupo'}
          </td>
        </tr>
      `;
    }).join('');

    // Render the events table
    app.innerHTML = 
      `<h2>Available Events</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Capacity</th><th>Date</th><th>Action</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
      <br>
      <a href="#dashboard"><button>Back</button></a>
    `;

    // Add click event to all "Inscribirse" buttons
    document.querySelectorAll('.inscribirse').forEach(btn => {
      btn.addEventListener('click', async () => {
        const eventId = parseInt(btn.dataset.id); // Get event ID
        const evento = eventos.find(e => e.id === eventId); // Find event object

        // Check if event exists and has available capacity
        if (!evento || evento.cupo < 100) {
          alert('You cannot register for this event.');
          return;
        }

        try {
          // Send POST request to register the user for the event
          const res = await fetch('http://localhost:3000/inscripciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, eventId })
          });

          // Check if registration was successful
          if (!respuestaOk(res)) throw new Error('Could not register');

          // Send PATCH request to update event capacity
          const resPatch = await fetch(`http://localhost:3000/event/${eventId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cupo: evento.cupo + 1 })
          });

          // Check if capacity update was successful
          if (!respuestaOk(resPatch)) throw new Error('Error updating capacity');

          alert('You have registered successfully');
          mostrarVistaMisEventos(); // Reload the view
        } catch (err) {
          console.error(err);
          alert('An error occurred while registering.');
        }
      });
    });

  } catch (error) {
    app.innerHTML = '<p style="color:red;">Could not load events.</p>';
  }
}
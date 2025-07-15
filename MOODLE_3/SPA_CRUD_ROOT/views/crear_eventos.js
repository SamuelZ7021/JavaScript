import { obtenerUsuarioActivo } from '../utils/auth.js'; // Import function to get the active user
import { respuestaOk } from '../utils/validation.js'; // Import function to validate HTTP response

// Function to render the "Create Event" view
export async function mostrarVistaCrearEventos() {
    const app = document.getElementById('app'); // Get the main app container
    const user = obtenerUsuarioActivo(); // Get the current user

    // Check if the user is not logged in or not an admin
    if (!user || user.role !== 'admin'){
        app.innerHTML = `<p style="color:red;">Access denied. Only administrators can view this page.</p>`;
        return; // Stop execution if not authorized
    }

    // Render the event creation form
    app.innerHTML = `
    <h2>New Event</h2>
    <form id="form-evento">
      <input type="text" name="nombre" placeholder="Event name" required />
      <input name="descripcion" placeholder="Event description" required> </textarea>
      <input type="number" name="cupo" placeholder="Capacity" required min="1"/>
      <input type="date" name="fecha" required />
    <button type="submit">Save Event</button>
    </form>
    <a href="#dashboard"><button>Back</button><a/>
  `;

  const form = document.getElementById('form-evento'); // Get the form element
  form.addEventListener('submit', async (e) =>{ // Listen for form submission
    e.preventDefault(); // Prevent default form submission

    // Create a new event object from form values
    const newEvent = {
        nombre: form.nombre.value.trim(),
        descripcion: form.descripcion.value.trim(),
        cupo: parseInt(form.cupo.value),
        fecha: form.fecha.value
    }

    try{
        // Send POST request to create the event
        const res = await fetch('http://localhost:3000/event',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newEvent)
        });

        // Check if the response is OK
        if(respuestaOk(res)){
            alert('Event added successfully');
            location.hash = 'dashboard/events'; // Redirect to events dashboard
        } else {
            alert('Error creating the event');
        }
    } catch(error){
        alert('An unexpected error occurred');
    }
  });
};
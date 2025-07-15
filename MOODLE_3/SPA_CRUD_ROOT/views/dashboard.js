import { obtenerUsuarioActivo } from "../utils/auth.js"; // Import function to get the active user

// Function to render the dashboard view
export function mostrarVistaDashboard(){
    const app = document.getElementById('app'); // Get the main app container
    const user = obtenerUsuarioActivo(); // Get the current user

    // If user is not logged in, redirect to login
    if(!user) {
        location.hash = 'login';
        return;
    }

    // Render dashboard content based on user role
    app.innerHTML = `
    <h2>Bienvenido, ${user.username}</h2>
    <p>Mira nuestros productos, eventos seguro alguno te gustara</p>
    <div style="margin-top: 2rem;">
    ${user.role === 'admin' ? `
        <a href="#dashboard/events/create"><button>Crear Evento</button></a> <!-- Link to create event (admin only) -->
        <a href="#dashboard/events"><button>Ver todos los eventos</button></a> <!-- Link to view all events (admin only) -->
        `:`
        <a href="#dashboard/mis-eventos"><button>Mis Eventos</button></a> <!-- Link to user's events (client only) -->
        <a href="#dashboard/mis-eventos"><button>Ver Eventos Disponibles</button></a> <!-- Link to available events (client only) -->
        `}
        </div>
    `;
};
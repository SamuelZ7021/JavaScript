// Import view functions from each module
import { mostrarVistaRegistro } from '../views/registro.js';
import { mostrarVistalogin } from '../views/login.js';
import { mostrarVistaDashboard } from '../views/dashboard.js';
import { mostrarVistaCrearEventos } from '../views/crear_eventos.js';
import { mostrarVistaEventosAdmin } from '../views/eventos_admin.js';
import { mostrarVistaEditarEvento} from '../views/editar_eventos.js';
import { mostrarVistaMisEventos} from '../views/mis_eventos.js'

// Define routes and associate them with their corresponding view functions
const routes = {
  'registro': mostrarVistaRegistro,
  'login': mostrarVistalogin,
  'dashboard': mostrarVistaDashboard,
  'dashboard/events/create': mostrarVistaCrearEventos,
  'dashboard/events': mostrarVistaEventosAdmin,
  'dashboard/events/edit': mostrarVistaEditarEvento,
  'dashboard/mis-eventos': mostrarVistaMisEventos,
};

// Function to load the correct view based on the current hash route
function cargarVista() {
  const hash = window.location.hash; // Get the current hash from the URL
  const route = hash.slice(1) || 'dashboard'; // Remove '#' and set default route

  if (routes[route]) { // If the route exists in the routes object
    routes[route](); // Call the corresponding view function
  } else {
    // If the route does not exist, show a 404 error message
    document.getElementById('app').innerHTML = '<h2>404</h2><p>Página no encontrada.</p>';
  }
}

// Listen for hash changes to update the view when navigation occurs
window.addEventListener('hashchange', cargarVista);

// Listen for page load to set the default route and load the initial view
window.addEventListener('load', () => {
  if (!window.location.hash) { // If there is no hash in the URL
    window.location.hash = 'dashboard'; // Set default hash to 'dashboard'
  }
  cargarVista(); // Load the corresponding view
});
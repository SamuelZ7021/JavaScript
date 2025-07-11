import { mostrarVistalogin } from '../views/login.js';
import { mostrarVistaHome } from '../views/home.js';
import { mostrarVistaRegistro } from '../views/registro.js';
import { mostrarVistaProductos } from '../views/productos.js';
import { mostrarVistaProductosCliente } from '../views/clientes.js'

const routes = {
    'login': mostrarVistalogin,
    'home': mostrarVistaHome,
    'registro': mostrarVistaRegistro,
    'productos': mostrarVistaProductos,
    'productos-cliente': mostrarVistaProductosCliente
};

function cargarVista() {
    const hash = window.location.hash;
    const route = hash.slice(1) || 'login';

    if (routes[route]) {
        routes[route]();
    } else {
        document.getElementById('app').innerHTML = `
            <h2>404</h2>
            <p>Página no encontrada.</p>
    `;
    }
};

window.addEventListener('hashchange', cargarVista);
window.addEventListener('load', cargarVista);

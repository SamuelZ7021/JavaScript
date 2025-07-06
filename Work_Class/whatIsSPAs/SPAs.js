// Definimos las rutas y su contenido
const rutas = {
    '/inicio': '<h2>Bienvenido a la página de inicio</h2><p>Esta es la sección de inicio de nuestra SPA.</p>',
    '/acerca': '<h2>Acerca de nosotros</h2><p>Aquí encontrarás información sobre nuestra empresa.</p>',
    '/contacto': '<h2>Contacto</h2><p>Puedes contactarnos a través de este formulario.</p>'
};

// Función para cargar el contenido basado en la ruta actual
function cargarContenido() {
    const hash = window.location.hash; // Si no hay hash, usamos la ruta de inicio
    const ruta = hash.slice(1) // eliminar el símbolo #
    const contenido = rutas[ruta] || '<h2>404</h2><p>Página no encontrada.</p>';
    document.getElementById('content').innerHTML = contenido;
};

// Escucha cambios en el hash de la url
window.addEventListener('hashchange', cargarContenido);

// Carga inicial
window.addEventListener('load', cargarContenido)


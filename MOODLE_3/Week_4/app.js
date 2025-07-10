const form = document.getElementById('userForm');
const nombreInput = document.getElementById('nombre');
const edadInput = document.getElementById('edad');
const output = document.getElementById('output');
const btnLimpiar = document.getElementById('limpiar');
const contadorSpan = document.getElementById('contador');

// Guardar datos en localStorage
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const edad = edadInput.value.trim();

    if (nombre && edad && parseInt(edad) > 0) {
        const datos = {nombre, edad };
        localStorage.setItem('usuario', JSON.stringify(datos));
        mostrarDatos();
    } else {
        alert('Por favor, ingresa un nombre válido y una edad mayor que 0.');
    }
});

// Mostrar datos al cargar
function mostrarDatos() {
    const datosGuardados = localStorage.getItem('usuario');
    if (datosGuardados) {
        const usuario = JSON.parse(datosGuardados);
        output.innerHTML = `<p><strong>Nombre:</strong> ${usuario.nombre}</p><p><strong>Edad:</strong> ${usuario.edad}</p>`;
    } else {
        output.textContent = 'No hay información almacenada.';
    }
    console.log('el dato guardado es:', datosGuardados)
};


// Contador de interacciones por sesión
function aumentarContador() {
    let contador = sessionStorage.getItem('interacciones');
    contador = contador ? parseInt(contador) + 1 : 1;
    sessionStorage.setItem('interacciones', contador);
    contadorSpan.textContent = contador;
    console.log('Contador:', contador)
};

// Limpiar datos
btnLimpiar.addEventListener('click', () => {
    localStorage.removeItem('usuario');
    mostrarDatos();
});

// Ejecutar al cargar la página
mostrarDatos();
aumentarContador();

alert("¡Bienvenid@ al programa de validacion!")

//Inicializar una funcion 
window.validacion = function(){

    //Creacion de variables
    const nombre = String(document.getElementById('Name').value);
    const edad = parseInt(document.getElementById('Year').value);
    const salida = document.getElementById('salidaDeResultado');
    
    //Interagracion de los tres tipos de condicionales
    if (!+ nombre && Number.isInteger(edad) && edad >= 18 && edad <= 100) {
        salida.innerHTML += `<p>Nombre: ${nombre}</p><p>Edad: ${edad}</p>`;
        salida.innerHTML += `<p> Hola ${nombre} eres mayor de edad, todavia hay mas cosas que aprender ¡SIEMPRE CON LA MEJOR ACTITUD!</p>`
    } else if (!+ nombre && Number.isInteger(edad) && edad <= 18 && edad >= 0){
        salida.innerHTML += `<p>Nombre: ${nombre}</p><p>Edad: ${edad}</p>`;
        salida.innerHTML += `<p>Hola ${nombre} eres menor de edad, aun te queda mucho camino por recorrer ¡DALE CON TODA!</p>`;
    } else {
        salida.innerHTML += `<p>Por favor, complete todos los campos correctamente.</p>`;
    }       
}

//Esta funcion es (opcional) es para borrar los registro que se muestran en pantalla
window.limpiarRegistro = function(){
    document.getElementById('salidaDeResultado').innerHTML = '';
}
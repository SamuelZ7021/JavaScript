// Validate that a string is not empty
export function campoNoVacio(valor) {
    return valor.trim() !== '';
}

// Validate that the price is a positive number
export function precioValido(valor) {
    const numero = parseInt(valor);
    return !isNaN(numero) && numero > 0;
}

// Validate that the role is allowed
export function rolValido(rol) {
    return rol === 'admin' || rol === 'cliente';
}

// Validate registration fields
export function validarRegistro({ username, password, role }) {
    return campoNoVacio(username) && campoNoVacio(password) && rolValido(role);
}

// Validate event form fields
export function validarProducto({ nombre, descripcion, cupo, date}) {
    return campoNoVacio(nombre) && descripcionValido(descripcion) && campoNoVacio(cupo) && campoNoVacio(date);
}

// Validate HTTP response
export function respuestaOk(respuesta) {
    return respuesta && respuesta.ok;
}

// Validate that data is a valid ID (number or non-empty string)
export function idValido(id) {
    return campoNoVacio(String(id));
}

// Validate form with basic error message
export function mostrarErrorSi(condicion, mensaje) {
    if (!condicion) {
        alert(mensaje);
        return true;
    }
    return false;
}

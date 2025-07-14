// utils/validaciones.js

// Validar que un string no esté vacío
export function campoNoVacio(valor) {
    return valor.trim() !== '';
}

// Validar que el precio sea un número positivo
export function precioValido(valor) {
    const numero = parseFloat(valor);
    return !isNaN(numero) && numero > 0;
}

// Validar que el rol sea permitido
export function rolValido(rol) {
    return rol === 'admin' || rol === 'cliente';
}

// Validar campos de registro
export function validarRegistro({ username, password, role }) {
    return campoNoVacio(username) && campoNoVacio(password) && rolValido(role);
}

// Validar campos del formulario de producto
export function validarProducto({ nombre, precio, categoria }) {
    return campoNoVacio(nombre) && precioValido(precio) && campoNoVacio(categoria);
}

// Validar respuesta HTTP
export function respuestaOk(respuesta) {
    return respuesta && respuesta.ok;
}

// Validar que un dato sea un ID válido (número o string no vacío)
export function idValido(id) {
    return campoNoVacio(String(id));
}

// Validar formulario con mensaje de error básico
export function mostrarErrorSi(condicion, mensaje) {
    if (!condicion) {
        alert(mensaje);
        return true;
    }
    return false;
}

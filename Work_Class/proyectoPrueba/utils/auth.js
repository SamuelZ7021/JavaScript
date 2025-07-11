export function obtenerUsuarioActivo(){
    const data = sessionStorage.getItem('usuario');
    return data ? JSON.parse(data) : null
}

// Verifica si hay un usuario autenticado
export function estaAutenticado() {
    return !!sessionStorage.getItem('usuario');
}

// Verifica si el usuario es admin
export function esAdmin() {
    const usuario = obtenerUsuarioActivo();
    return usuario && usuario.role === 'admin';
}

// Verifica si el usuario es cliente
export function esCliente() {
    const usuario = obtenerUsuarioActivo();
    return usuario && usuario.role === 'cliente';
}

// Cierra la sesión
export function cerrarSesion() {
    sessionStorage.removeItem('usuario');
    location.hash = 'login';
}
export function obtenerUsuarioActivo(){
    const data = sessionStorage.getItem('usuario');
    return data ? JSON.parse(data) : null
}

// Checks if there is an authenticated user
export function estaAutenticado() {
    return !!sessionStorage.getItem('usuario');
}

// Checks if the user is an admin
export function esAdmin() {
    const usuario = obtenerUsuarioActivo();
    return usuario && usuario.role === 'admin';
}

// Checks if the user is a client
export function esCliente() {
    const usuario = obtenerUsuarioActivo();
    return usuario && usuario.role === 'cliente';
}

// Logs out the user
export function cerrarSesion() {
    sessionStorage.removeItem('usuario');
    location.hash = 'login';
}
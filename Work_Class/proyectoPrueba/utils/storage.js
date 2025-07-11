// utils/storage.js

// Guardar un dato en localStorage (con clave y valor JSON)
export function guardarEnLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Leer un dato desde localStorage (devuelve null si no existe)
export function leerDesdeLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Eliminar un dato de localStorage por su clave
export function eliminarDeLocal(key) {
  localStorage.removeItem(key);
}

// Agregar un nuevo elemento a una lista en localStorage
export function agregarAListaLocal(key, item) {
  const lista = leerDesdeLocal(key) || [];
  lista.push(item);
  guardarEnLocal(key, lista);
}

// Eliminar un elemento de una lista en localStorage por ID
export function eliminarDeListaLocalPorId(key, id) {
  let lista = leerDesdeLocal(key) || [];
  lista = lista.filter(item => item.id !== id);
  guardarEnLocal(key, lista);
}

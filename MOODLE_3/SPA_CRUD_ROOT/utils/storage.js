// Save data to localStorage (with key and JSON value)
export function guardarEnLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Read data from localStorage (returns null if not found)
export function leerDesdeLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Remove data from localStorage by key
export function eliminarDeLocal(key) {
  localStorage.removeItem(key);
}

// Add a new item to a list in localStorage
export function agregarAListaLocal(key, item) {
  const lista = leerDesdeLocal(key) || [];
  lista.push(item);
  guardarEnLocal(key, lista);
}

// Remove an item from a list in localStorage by ID
export function eliminarDeListaLocalPorId(key, id) {
  let lista = leerDesdeLocal(key) || [];
  lista = lista.filter(item => item.id !== id);
  guardarEnLocal(key, lista);
}

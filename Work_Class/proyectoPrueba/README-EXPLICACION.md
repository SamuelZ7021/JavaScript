# 📚 Explicación Detallada del Proyecto

Este proyecto es una aplicación web sencilla para gestionar usuarios y productos. Está hecha con JavaScript puro y simula una pequeña tienda con roles de administrador y cliente.  
A continuación se explica cada archivo y su función, paso a paso.

---

## 1. SPA/app.js

**¿Qué hace este archivo?**  
Es el "cerebro" de la aplicación. Se encarga de mostrar la pantalla correcta según la ruta (por ejemplo, login, registro, productos, etc.).

**¿Cómo funciona?**
- Importa las funciones que muestran cada pantalla desde la carpeta `views`.
- Define un objeto llamado `routes` que relaciona cada ruta (por ejemplo, 'login') con la función que debe mostrar esa pantalla.
- Cuando la URL cambia (por ejemplo, de `#login` a `#home`), ejecuta la función correspondiente.
- Si la ruta no existe, muestra un mensaje de "404 Página no encontrada".

**Código clave:**
```javascript
const routes = {
    'login': mostrarVistalogin,
    'home': mostrarVistaHome,
    'registro': mostrarVistaRegistro,
    'productos': mostrarVistaProductos,
    'productos-cliente': mostrarVistaProductosCliente
};
```
Esto significa que si la URL es `#home`, se ejecuta `mostrarVistaHome()`.

---

## 2. views/login.js

**¿Qué hace este archivo?**  
Muestra el formulario de inicio de sesión y valida al usuario.

**¿Cómo funciona?**
- Dibuja un formulario con campos para usuario y contraseña.
- Cuando el usuario envía el formulario, busca en la base de datos (simulada con JSON Server) si existe ese usuario y contraseña.
- Si es correcto, guarda los datos del usuario en la sesión y lo lleva a la pantalla principal.
- Si no, muestra un mensaje de error.

**Código clave:**
```javascript
const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
const data = await res.json();
if (data.length > 0) {
    // Usuario correcto
    sessionStorage.setItem('usuario', JSON.stringify(data[0]));
    location.hash = 'home';
} else {
    // Error
    document.getElementById('mensaje-error').textContent = 'Usuario o contraseña incorrectos.';
}
```

---

## 3. views/registro.js

**¿Qué hace este archivo?**  
Permite crear un nuevo usuario.

**¿Cómo funciona?**
- Muestra un formulario para ingresar nombre de usuario, contraseña y rol (admin o cliente).
- Al enviar el formulario, verifica si el usuario ya existe.
- Si no existe, lo guarda en la base de datos y en el almacenamiento local.
- Si existe, muestra un mensaje de error.

**Código clave:**
```javascript
const resCheck = await fetch(`http://localhost:3000/users?username=${username}`);
const usuarios = await resCheck.json();
if (usuarios.length > 0) {
    document.getElementById('mensaje-registro').textContent = 'Ese nombre de usuario ya está registrado.';
    return;
}
```
Esto evita que se registren dos usuarios con el mismo nombre.

---

## 4. views/home.js

**¿Qué hace este archivo?**  
Muestra la pantalla principal después de iniciar sesión.

**¿Cómo funciona?**
- Muestra el nombre y el rol del usuario.
- Si el usuario es administrador, le da acceso a la gestión de productos.
- Si es cliente, le permite ver el catálogo de productos.
- Incluye un botón para cerrar sesión.

**Código clave:**
```javascript
if (usuario.role === 'admin') {
    contenido += `<a href="#productos">Ir a gestión de productos</a>`;
} else if (usuario.role === 'cliente') {
    contenido += `<a href="#productos-cliente">Ver productos</a>`;
}
```

---

## 5. views/productos.js

**¿Qué hace este archivo?**  
Permite al administrador agregar, editar y eliminar productos.

**¿Cómo funciona?**
- Muestra un formulario para agregar productos (nombre, precio, categoría).
- Muestra una tabla con todos los productos.
- Permite editar o eliminar productos usando botones.
- Solo los administradores pueden acceder a esta pantalla.

**Código clave:**
```javascript
if (!usuario || usuario.role !== 'admin') {
    app.innerHTML = `<p style="color:red;">Acceso denegado. Solo los administradores pueden ver esta página.</p>`;
    return;
}
```
Esto asegura que solo los administradores puedan gestionar productos.

---

## 6. views/clientes.js

**¿Qué hace este archivo?**  
Permite a los clientes ver el catálogo de productos.

**¿Cómo funciona?**
- Muestra una tabla con todos los productos disponibles.
- Solo los usuarios con rol "cliente" pueden acceder.

**Código clave:**
```javascript
if (!usuario || usuario.role !== 'cliente') {
    app.innerHTML = `<p style="color:red;">Acceso denegado. Solo los clientes pueden ver esta página.</p>`;
    return;
}
```

---

## 7. utils/auth.js

**¿Qué hace este archivo?**  
Gestiona la autenticación y los roles de usuario.

**¿Cómo funciona?**
- Permite obtener el usuario activo desde la sesión.
- Verifica si el usuario está autenticado.
- Verifica si el usuario es administrador o cliente.
- Permite cerrar sesión.

**Código clave:**
```javascript
export function obtenerUsuarioActivo(){
    const data = sessionStorage.getItem('usuario');
    return data ? JSON.parse(data) : null
}
```
Esto recupera los datos del usuario guardados en la sesión.

---

## 8. utils/storage.js

**¿Qué hace este archivo?**  
Permite guardar, leer y eliminar datos en el almacenamiento local del navegador.

**¿Cómo funciona?**
- Guarda datos en `localStorage` usando una clave.
- Lee datos desde `localStorage`.
- Elimina datos de `localStorage`.
- Permite agregar o eliminar elementos de una lista guardada en `localStorage`.

**Código clave:**
```javascript
export function guardarEnLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
```
Esto guarda cualquier dato en el almacenamiento local, convirtiéndolo a texto JSON.

---

## Resumen

- **SPA/app.js**: Controla la navegación entre pantallas.
- **views/**: Contiene las pantallas principales (login, registro, home, productos, clientes).
- **utils/auth.js**: Gestiona la autenticación y roles.
- **utils/storage.js**: Permite guardar y leer datos localmente.

Cada archivo tiene una función clara y está pensado para que el código sea fácil de entender y modificar.  
Si tienes dudas sobre cómo funciona alguna parte, revisa los comentarios en el código o pregunta por detalles específicos.

---
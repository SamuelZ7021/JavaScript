
# 🛒 SPA Gestión de Productos con Login y Roles

Este proyecto es una aplicación web de una sola página (SPA) construida con HTML, CSS y JavaScript puro. Permite gestionar usuarios y productos según el tipo de rol, utilizando `localStorage`, `sessionStorage` y `JSON Server`.

---

## 📌 Funcionalidades principales

- ✅ Registro e inicio de sesión con control de roles (`admin`, `cliente`)
- ✅ Enrutamiento sin recarga (SPA con hash routing)
- ✅ CRUD completo de productos para administradores
- ✅ Vista de productos para clientes (solo lectura)
- ✅ Manejo de sesiones con `sessionStorage`
- ✅ Guardado de datos locales con `localStorage`
- ✅ Servidor simulado con `JSON Server`

---

## 🧰 Tecnologías usadas

- HTML + CSS + JavaScript (vanilla)
- `JSON Server` (API local REST)
- `sessionStorage` y `localStorage`
- Módulos ES6 (`import/export`)
- SPA con Hash Routing (`#ruta`)

---

## 📁 Estructura del proyecto

```
/SPA
├── index.html
├── app.js
├── styles.css
├── db.json
├── /views
│   ├── login.js
│   ├── registro.js
│   ├── home.js
│   ├── productos.js
│   └── productos_cliente.js
└── /utils
    ├── auth.js
    ├── storage.js
    └── api.js
```

---

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga el proyecto.
2. Instala JSON Server si no lo tienes:

   ```bash
   npm install -g json-server
   ```

3. Inicia el servidor con:

   ```bash
   json-server --watch db.json --port 5000
   ```

4. Abre `index.html` en tu navegador (por ejemplo, con Live Server en VSCode).
5. Usa las rutas `#login`, `#home`, `#registro`, `#productos`, `#productos-cliente` para navegar.

---

## 👤 Tipos de usuario

### Admin
- Puede acceder a `/productos`
- Puede agregar, editar y eliminar productos

### Cliente
- Puede acceder a `/productos-cliente`
- Solo puede visualizar los productos

---

## 🧠 Aprendizajes aplicados

- Manejo de rutas con Hash (`window.location.hash`)
- Validación de roles en las vistas
- Uso modular de código con `auth.js`, `storage.js`, `api.js`
- Guardado y lectura de datos desde almacenamiento local
- Sin recarga de página: experiencia SPA

---

## ✅ Autenticación y protección

Se valida si el usuario está logueado con:

```js
sessionStorage.getItem('usuario')
```

Y se verifica su rol para restringir el acceso a vistas como `productos.js`.

---

## 💾 Persistencia local (`utils/storage.js`)

Se guarda en `localStorage`:
- Productos agregados
- Usuarios registrados

Funciones:
```js
guardarEnLocal(clave, datos)
leerDesdeLocal(clave)
agregarAListaLocal(clave, objetoNuevo)
eliminarDeListaLocalPorId(clave, id)
```

---

## 📦 Base de datos local (`users.json`)

```json
{
  "users": [
    { "id": 1, "username": "Samuel", "password": "1234admin", "role": "admin" },
    { "id": 2, "username": "Laura", "password": "1234", "role": "cliente" }
  ],
  "products": [],
  "categories": [
    { "id": 1, "nombre": "Tecnología" },
    { "id": 2, "nombre": "Ropa" },
    { "id": 3, "nombre": "Hogar" }
  ]
}
```

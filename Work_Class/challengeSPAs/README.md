# Panel de Administración de Usuarios (SPA con Hash Routing)

Este proyecto es una **Single Page Application (SPA)** desarrollada con JavaScript puro, HTML5 y CSS3. Permite gestionar usuarios con operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) simuladas mediante un servidor local `json-server`. La navegación se realiza usando **Hash Routing**, sin recargar la página.

---

## 🚀 Instalación y configuración

### 1. Clona el repositorio o descarga el ZIP

```bash
https://github.com/tu-usuario/administrador-usuarios-spa.git
```

### 2. Instala `json-server` si no lo tienes

```bash
npm install -g json-server
```

### 3. Asegúrate de tener el archivo `db.json` con esta estructura:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "phone": "1234567890",
      "enrollNumber": "98765432101234",
      "dateOfAdmission": "2022-01-01"
    }
  ]
}
```

### 4. Ejecuta el servidor local

```bash
json-server --watch db.json --port 3000
```

Esto iniciará una API REST falsa en:

```
http://localhost:3000/users
```

---

## 🖥 Uso de la aplicación

Abre `index.html` en tu navegador. La aplicación tiene tres vistas:

* `#usuarios`  → lista de usuarios (lectura)
* `#crear`     → formulario para agregar nuevos usuarios
* `#editar-1`  → formulario para editar usuario con id=1

### 🔁 Navegación

La aplicación detecta cambios en la URL (hash) y muestra contenido según el valor:

```javascript
#usuarios   → muestra tabla de usuarios
#crear      → muestra formulario vacío
#editar-3   → muestra formulario con datos del usuario con ID 3
```

### 🧪 Operaciones CRUD

* **GET**: se realiza para mostrar la lista de usuarios
* **POST**: cuando creas un nuevo usuario
* **PUT**: cuando editas un usuario existente
* **DELETE**: al hacer clic en "Eliminar" con confirmación

Puedes verificar estas solicitudes en la pestaña **Network** de las herramientas de desarrollador del navegador.

---

## 🧩 Tecnologías utilizadas

* HTML5 y CSS3 (con Flexbox)
* JavaScript Vanilla (ES6+)
* json-server como API simulada

---

## ✅ Consejos

* Usa `Live Server` o abre `index.html` desde un entorno local
* Asegúrate de tener corriendo `json-server` antes de usar la app
* Evita errores agregando `e.preventDefault()` en los formularios
* Usa `catch()` en los `fetch()` para ver errores en consola
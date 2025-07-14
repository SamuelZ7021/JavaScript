# 🚀 Migrar y Usar tu SPA con Vite (Guía Paso a Paso)

Este README te enseña cómo convertir tu proyecto SPA en un servidor moderno usando **Vite**, explicado de forma sencilla.

---

## 🧠 ¿Qué es Vite?

Vite es una herramienta que nos ayuda a crear páginas web modernas. Es como un ayudante que te da todo listo para que no tengas que hacerlo tú solo.

---

## 🛠 Requisitos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org) (versión 16 o superior)
- `npm` (ya viene con Node.js)

Puedes verificarlo con:

```bash
node -v
npm -v
```

---

## 🪄 Crear tu proyecto con Vite

1. Abre la terminal (o consola de comandos).
2. Escribe esto:

```bash
npm create vite@latest mi-spa-vite -- --template vanilla
```

3. Ahora entra a la carpeta:

```bash
cd mi-spa-vite
```

4. Instala todo lo necesario:

```bash
npm install
```

---

## 📁 Organiza tu proyecto

Dentro de la carpeta `mi-spa-vite`, tendrás esto:

```
mi-spa-vite/
├── index.html
├── vite.config.js
├── package.json
├── style.css
├── main.js         ← Este reemplaza tu app.js
├── /views
│   ├── login.js
│   ├── home.js
│   ├── registro.js
│   ├── productos.js
│   └── productos_cliente.js
└── /utils
    ├── auth.js
    ├── storage.js
    └── validaciones.js
```

---

## 🧩 Cambiar tus archivos

### 1. Renombra tu `app.js` a `main.js`

Abre `main.js` y revisa que todos los import estén así (rutas relativas):

```js
import { mostrarVistaHome } from './views/home.js';
import { mostrarVistalogin } from './views/login.js';
```

> Usa `./` si el archivo está en la misma carpeta.

---

### 2. Ajusta tu `index.html`

Abre `index.html` y asegúrate de que el script sea así:

```html
<script type="module" src="/main.js"></script>
```

---

## ⚙️ Archivos importantes

### 📄 package.json

Este archivo se crea solo y contiene:

```json
{
  "name": "mi-spa-vite",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### 📄 vite.config.js

Aquí puedes configurar tu servidor. Por ahora puedes dejarlo así:

```js
// vite.config.js
export default {
  base: './'
}
```

---

## 🚀 Ejecutar tu servidor

Dentro de tu proyecto Vite, corre esto:

```bash
npm run dev
```

Eso abre la app en tu navegador, normalmente en:

```
http://localhost:5173
```

---

## 💾 Usar JSON Server (como antes)

Sigue usando tu `db.json` y ejecuta:

```bash
json-server --watch db.json --port 3000
```

Tu frontend (Vite) corre en el puerto `5173` y el backend (JSON Server) en el `3000`.

---

## 🧱 Construir para producción

Cuando termines, corre:

```bash
npm run build
```

Eso crea una carpeta `dist/` lista para subir a GitHub Pages o Netlify.

---

## ✅ ¡Listo!

Ya migraste tu SPA a Vite. Ahora tienes:

- 🔥 Un servidor rápido
- ⚡ Carga de módulos moderna
- 📁 Proyecto bien organizado

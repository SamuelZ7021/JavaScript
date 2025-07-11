# ⚡ Instrucciones Rápidas – SPA de Productos y Login

Esta guía rápida te ayuda a ejecutar y probar la aplicación SPA basada en roles.

---

## 🚀 Pasos para correr el proyecto

1. **Instala JSON Server** (una vez):

```bash
npm install -g json-server
```

2. **Inicia JSON Server** (en la carpeta donde está `users.json`):

```bash
json-server --watch users.json --port 3000
```

3. **Abre el archivo `index.html`** en tu navegador (usa Live Server o doble clic).

---

## 🔑 Cuentas de prueba

- **Admin**  
  Usuario: `Samuel`  
  Contraseña: `1234admin`

- **Cliente**  
  Usuario: `Laura`  
  Contraseña: `1234`

---

## 🧭 Rutas disponibles (SPA)

- `#login` → vista de inicio de sesión  
- `#registro` → formulario de registro  
- `#home` → menú principal según el rol  
- `#productos` → CRUD para admin  
- `#productos-cliente` → catálogo para cliente

---

## 🧩 Tecnologías clave

- HTML + JS (vanilla)
- JSON Server
- sessionStorage (sesión actual)
- localStorage (datos locales)
- Hash routing SPA
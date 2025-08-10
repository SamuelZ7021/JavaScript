# 📦 CRUD de Productos con Node.js, MySQL y DBeaver

Este proyecto implementa un sistema CRUD (Crear, Leer, Actualizar y Eliminar) para la gestión de productos, desarrollado con **Node.js**, **Express** y **MySQL**. Se utiliza **DBeaver** como cliente de base de datos y se incluye soporte para **subida de archivos CSV** para registrar productos de forma masiva.

---

## 📋 Requisitos previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (v18 o superior recomendado) → [Descargar aquí](https://nodejs.org/)
- **MySQL** (Servidor de base de datos)
- **DBeaver** (Opcional, para administrar la base de datos) → [Descargar aquí](https://dbeaver.io/download/)

---

## ⚙️ Instalación

### 1️⃣  Instalar dependencias
Ejecuta:
```bash
npm install
```
Esto instalará:
- `express` → Servidor y manejo de rutas HTTP.
- `mysql2` → Conexión a MySQL.
- `cors` → Permitir peticiones desde distintos orígenes.
- `dotenv` → Manejo de variables de entorno.
- `multer` → Subida de archivos al servidor.
- `csv-parser` → Lectura y procesamiento de archivos CSV.

---

## 🗄 Configuración de la base de datos

### 1️⃣ Crear base de datos
En MySQL:
```sql
CREATE DATABASE crud_productos;
USE crud_productos;
```

### 2️⃣ Crear tabla
```sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);
```
Reemplaza `tu_usuario` y `tu_contraseña` con tus credenciales de MySQL.

---

## 🚀 Ejecución del proyecto

Para iniciar el servidor:
```bash
npm start
```
Esto ejecutará:
```bash
node server.js
```

Por defecto el servidor se ejecuta en:
```
http://localhost:3000
```

---

## 📂 Estructura del proyecto

```
PRUEBASQL/
│
├── node_modules/          # Dependencias instaladas por npm
│
├── private/               # Backend del proyecto
│   └── database.js        # Conexión con MySQL
│
├── public/                # Frontend del proyecto
│   ├── index.html         # Interfaz principal
│   ├── script.js          # Lógica de interacción con la API
│   └── style.css          # Estilos
│
├── uploads/               # Carpeta para archivos subidos
│
├── .env                   # Variables de entorno
├── .gitignore             # Archivos/carpetas ignorados por Git
├── package.json           # Configuración y dependencias
├── package-lock.json      # Versiones exactas de dependencias
└── server.js              # Servidor Express y rutas API
```

---

## 📌 Funcionalidades

- **CRUD de productos**
  - Crear productos manualmente.
  - Listar productos desde la base de datos.
  - Editar productos existentes.
  - Eliminar productos.
- **Subida de CSV**
  - Permite importar varios productos desde un archivo CSV.
- **Interfaz integrada**
  - Frontend y Backend en un mismo proyecto.
- **Base de datos MySQL**
  - Conexión optimizada con `mysql2`.

---

## 📂 Formato del archivo CSV

Para usar la funcionalidad de carga masiva, el archivo CSV debe seguir este formato (sin encabezados):

```
nombre,precio
Producto A,10.50
Producto B,25.00
Producto C,5.75
```

El servidor leerá cada línea y registrará el producto en la base de datos.

---

## 🖥 Uso paso a paso

1. Abre la aplicación en el navegador (`http://localhost:3000`).
2. Para agregar productos manualmente:
   - Rellena el formulario en pantalla y presiona **Guardar**.
3. Para importar desde CSV:
   - Haz clic en el botón de **Subir archivo**.
   - Selecciona un archivo `.csv` con el formato correcto.
   - El sistema procesará e insertará todos los productos.
4. Para editar o eliminar:
   - Usa los botones correspondientes en la tabla de productos.
5. Los cambios se reflejarán en la base de datos MySQL.

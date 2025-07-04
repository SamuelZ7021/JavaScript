# SPA con Hash Routing (JavaScript puro)

Este proyecto es un ejemplo básico de una **Single Page Application (SPA)** utilizando **Hash Routing** en JavaScript puro. El objetivo es demostrar cómo se puede manejar la navegación entre distintas secciones sin recargar la página, aprovechando el uso del símbolo `#` en la URL.

---

## 📌 ¿Qué es el Hash Routing?

El **Hash Routing** es una técnica común en aplicaciones web de una sola página que permite cambiar de vista sin necesidad de realizar una petición al servidor. Funciona utilizando la parte del *hash* en la URL (es decir, todo lo que está después del símbolo `#`). Esta parte no se envía al servidor, por lo que JavaScript puede usarla para mostrar diferentes secciones de la aplicación.

Ejemplo de URL:

```
https://misitio.com/#/acerca
```

---

## ⚙️ Funcionamiento del Código

El comportamiento se basa en dos eventos del navegador:

### 1. `window.addEventListener('load', cargarContenido);`

Este evento se ejecuta una vez cuando la página termina de cargar. Llama a la función `cargarContenido()` para mostrar la vista adecuada según el hash actual. Si no hay hash, se mostrará por defecto la página de inicio (`#/inicio`).

### 2. `window.addEventListener('hashchange', cargarContenido);`

Este evento se activa cada vez que el usuario cambia la parte del hash en la URL (por ejemplo, al hacer clic en un enlace de navegación). Llama también a `cargarContenido()` para actualizar dinámicamente el contenido sin recargar la página.

---

## 🧠 Lógica de enrutamiento

Se utiliza un objeto llamado `rutas` que actúa como un pequeño "router":

```javascript
const rutas = {
  '/inicio': 'Contenido de inicio',
  '/acerca': 'Contenido de acerca de',
  '/contacto': 'Contenido de contacto'
};
```

La función `cargarContenido()`:

* Lee el valor de `window.location.hash`.
* Elimina el `#` con `.slice(1)` para obtener la ruta real.
* Busca esa ruta en el objeto `rutas`.
* Inserta el contenido correspondiente en el DOM.

### 🧾 ¿Qué hace `.slice(1)`?

El método `.slice(1)` se utiliza para eliminar el primer carácter de la cadena del hash, que siempre es `#`. Por ejemplo, si `window.location.hash` devuelve `#/inicio`, al aplicar `.slice(1)` obtenemos la subcadena `/inicio`, que es exactamente la clave que usamos dentro del objeto `rutas`.

Si se utilizara otro número como `.slice(2)`, se eliminaría también la barra (`/`) y la ruta quedaría como `inicio`, lo cual no coincidiría con las claves definidas y el contenido no se mostraría correctamente.

---

## 💾 Estructura del HTML

* Enlaces de navegación con `href="#/..."`.
* Un contenedor `<div id="content">` donde se renderiza el contenido según la ruta.

---

## ✅ Ventajas de este enfoque

* No requiere configuración del servidor.
* Fácil de implementar con JavaScript puro.
* Compatible con navegadores modernos y antiguos.
* Ideal para proyectos educativos o prototipos rápidos.

---

## 📁 Archivos clave

* `index.html`: contiene todo el código necesario (HTML, CSS básico y JavaScript embebido).
* No requiere archivos adicionales ni frameworks.

---

## 🚀 Cómo usarlo

1. Guarda el archivo como `index.html`.
2. Ábrelo en un navegador moderno.
3. Haz clic en los enlaces de navegación para ver el cambio de contenido sin recargar la página.

---

## 📚 Recursos recomendados

* [MDN Web Docs - window.location.hash](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)
* [MDN Web Docs - hashchange event](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)
* [Conceptos de Single Page Applications (SPA)](https://es.wikipedia.org/wiki/Single-page_application)

---

© Proyecto educativo – SPA con JavaScript y Hash Routing.

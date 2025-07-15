## Nombre: Samuel Andrey Zapata Casas 
## Clan: Linus
## Correo: samuelandrey1207@gmail.com
## Documento: 1036519037

# SPA CRUD Events

This project is a SPA application for managing events, users, and registrations, using pure JavaScript and a local JSON server.

## Structure

- `app/`: Main application files (HTML, JS, CSS)
- `views/`: SPA views (login, registration, dashboard, events, etc.)
- `utils/`: Utilities (authentication, validation, storage)
- `db.json`: Local database for the JSON server

## Requirements

- Node.js installed
- [json-server](https://github.com/typicode/json-server) installed globally

## Installing json-server

Install json-server globally:

```sh
npm install -g json-server
```

# SPA CRUD Events Project Structure Documentation

This document describes in detail the organization of the project's folders and files, explaining the purpose and functionality of each component. The goal is to facilitate understanding, maintenance, and scalability of the application.

---

## 1. `app/` Folder

Contains the main files that make up the base of the web application.

### Main file:

- **index.js**  
  Main SPA script.  
  - Implements the routing system based on the URL hash.
  - Imports view functions from the `views/` folder.
  - Manages loading views according to the route selected by the user.
  - Displays a 404 error page if the route does not exist.
  - Listens to `hashchange` and `load` events to update the view when the user navigates or reloads the page.

---

## 2. `views/` Folder

Groups the JavaScript modules that represent each SPA view or page. Each file contains the logic and rendering for a specific section of the application.

### View files:

- **login.js**  
  - Renders the login form.
  - Validates the user's credentials.
  - Manages authentication and session storage.

- **registro.js**  
  - Renders the registration form for new users.
  - Validates the entered data (name, email, password, etc.).
  - Sends the information to the JSON server to create a new user.

- **dashboard.js**  
  - Displays the main panel after logging in.
  - Shows options and access according to the user's role (administrator or client).
  - Can show statistics, quick access, and links to other views.

- **crear_eventos.js**  
  - Renders the form for creating new events.
  - Allows administrators to enter event details (name, date, description, etc.).
  - Sends the data to the JSON server to store the new event.

- **eventos_admin.js**  
  - Allows administrators to view, manage, and delete existing events.
  - Shows a list of events with options to edit or delete.

- **editar_eventos.js**  
  - Allows editing data of already created events.
  - Only accessible to users with the administrator role.
  - Validates changes and updates the information on the JSON server.

- **mis_eventos.js**  
  - Shows the events in which the user is registered.
  - Allows the user to cancel registration or view event details.

---

## 3. `utils/` Folder

Contains utility functions used in different parts of the application to avoid code duplication and facilitate reuse.

### Utility files:

- **auth.js**  
  - Functions to log in, log out, and verify authentication status.
  - Manages storage and retrieval of tokens or session data.
  - May include logic to protect routes and views according to the user's role.

- **storage.js**  
  - Functions to save, get, and delete data in `localStorage` or `sessionStorage`.
  - Facilitates data persistence in the browser.

- **validation.js**  
  - Functions to validate forms and data entered by the user.
  - Includes validations such as required fields, email format, password length, etc.

- **router.js**  
  - (Optional) May include additional logic for SPA routing.
  - Allows managing protected routes, redirects, and programmatic navigation.

---

## 4. `db.json` File

Local database file used by the JSON server (`json-server`). Simulates a REST API for local testing and development.

### Typical `db.json` structure:

- **usuarios**  
  List of registered users, each with their personal data and role (admin or client).

- **eventos**  
  List of created events, with details such as name, date, description, location, etc.

- **inscripciones**  
  Relationship between users and events they are registered for. Allows knowing which user is registered for which event.

### Example content:

```json
{
  "usuarios": [
    { "id": 1, "nombre": "Admin", "email": "admin@ejemplo.com", "rol": "admin" }
  ],
  "eventos": [
    { "id": 1, "nombre": "Conferencia JS", "fecha": "2025-08-01", "descripcion": "Evento sobre JavaScript" }
  ],
  "inscripciones": [
    { "id": 1, "usuarioId": 1, "eventoId": 1 }
  ]
}
```
const apiUrl = 'http://localhost:3000/users';
const viewContainer = document.getElementById('view-container');

function cargarVista() {
    const hash = location.hash.slice(1);
    viewContainer.innerHTML = '';

    if (hash === 'usuarios') {
        renderizarTablaUsuarios();
    } else if (hash === 'crear') {
        renderizarFormulario();
    } else if (hash.startsWith('editar-')) {
        const id = hash.split('-')[1];
        renderizarFormulario(id);
    } else {
        location.hash = 'usuarios';
    }
};

window.addEventListener('hashchange', cargarVista);
window.addEventListener('load', cargarVista);


function renderizarTablaUsuarios() {
    const tabla = document.createElement('table');
    tabla.id = 'usersTable';
    tabla.innerHTML = `
    <thead>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Teléfono</th>
        <th>Número de Inscripción</th>
        <th>Fecha de Ingreso</th>
        <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="usersTableBody"></tbody>`;
    viewContainer.appendChild(tabla);

    // Intentar obtener datos directamente del endpoint users
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            // Detectar la estructura de la respuesta
            const users = Array.isArray(data) ? data : data.users || [];
            const userT = document.getElementById('usersTableBody');
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.enrollNumber}</td>
                <td>${user.dateOfAdmission}</td>
                <td></td>`;

                const actionsCell = row.querySelector('td:last-child');

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Editar';
                editBtn.addEventListener('click', () => {
                    location.hash = `editar-${user.id}`;
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Eliminar';
                deleteBtn.addEventListener('click', () => deleteUser(user.id));

                actionsCell.appendChild(editBtn);
                actionsCell.appendChild(deleteBtn);

                userT.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
            viewContainer.innerHTML = '<div class="error-message">Error al cargar los usuarios. Por favor, verifica que el servidor JSON esté ejecutándose en http://localhost:3000.</div>';
        });
};

function renderizarFormulario(id) {
    const form = document.createElement('form');
    form.id = 'userForm';
    form.innerHTML = `
    <h2>${id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
    <div class="form-group">
        <label for="name">Nombre Completo:</label>
        <input type="text" id="name" required />
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" required />
    </div>
    <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" required />
    </div>
    <div class="form-group">
        <label for="enrollNumber">Número de Inscripción:</label>
        <input type="text" id="enrollNumber" required />
    </div>
    <div class="form-group">
        <label for="dateOfAdmission">Fecha de Ingreso:</label>
        <input type="date" id="dateOfAdmission" required />
    </div>
    <div class="form-actions">
        <button type="submit">Guardar</button>
    </div>`;

        viewContainer.appendChild(form);

    if (id) {
        fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(user => {
        // Solución: Usar getElementById para acceder a los elementos por sus IDs que sí existen en el HTML
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('enrollNumber').value = user.enrollNumber;
        document.getElementById('dateOfAdmission').value = user.dateOfAdmission;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    // Solución: Usar getElementById para obtener los valores de los campos del formulario correctamente
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        enrollNumber: document.getElementById('enrollNumber').value,
        dateOfAdmission: document.getElementById('dateOfAdmission').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        return response.json();
    })
    .then(() => {
        location.hash = 'usuarios';
    })
    .catch(error => {
        console.error('Error al guardar usuario:', error);
        alert('Error al guardar usuario. Por favor, intente nuevamente.');
    });
    // Agregué manejo de errores para mostrar mensajes claros si algo falla durante el guardado
    });
};

function deleteUser(id) {
    if (confirm('¿Deseas eliminar este usuario?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar: ' + response.status);
            }
            return response.json();
        })
        .then(() => cargarVista())
        .catch(error => {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar usuario. Por favor, intente nuevamente.');
        });
        //Agregué manejo de errores similar al del formulario para mayor consistencia
    }
};
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

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
        const userT = document.getElementById('usersTableBody');
        data.forEach(user => {
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
    });
};

function renderizarFormulario(id = null) {
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
            form.name.value = user.name;
            form.email.value = user.email;
            form.phone.value = user.phone;
            form.enrollNumber.value = user.enrollNumber;
            form.dateOfAdmission.value = user.dateOfAdmission;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

    const userData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        enrollNumber: form.enrollNumber.value,
        dateOfAdmission: form.dateOfAdmission.value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }).then(() => {
            location.hash = 'usuarios';
        });
    });
};

function deleteUser(id) {
    if (confirm('¿Deseas eliminar este usuario?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        }).then(() => cargarVista());
    }
};

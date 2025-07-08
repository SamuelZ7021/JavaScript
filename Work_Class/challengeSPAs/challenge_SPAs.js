// Base API URL for users
const apiUrl = 'http://localhost:3000/users';

// Main container where views will be rendered
const viewContainer = document.getElementById('view-container');

// Main function to load the view based on the URL hash
function cargarVista() {
    // Get the hash from the URL (without the #)
    const hash = location.hash.slice(1);
    // Clear the view container
    viewContainer.innerHTML = '';

    // Decide which view to render based on the hash
    if (hash === 'usuarios') {
        renderizarTablaUsuarios(); // Show users table
    } else if (hash === 'crear') {
        renderizarFormulario(); // Show create user form
    } else if (hash.startsWith('editar-')) {
        // If editing, get the user id and show the edit form
        const id = hash.split('-')[1];
        renderizarFormulario(id);
    } else {
        // If hash is not valid, redirect to users view
        location.hash = 'usuarios';
    }
};
// Listen for hash changes to reload the view
window.addEventListener('hashchange', cargarVista);
// Load the view when the page loads
window.addEventListener('load', cargarVista);

// Function to render the users table
function renderizarTablaUsuarios() {
    // Create the table and set its structure
    const tabla = document.createElement('table');
    tabla.id = 'usersTable';
    tabla.innerHTML = `
    <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Enroll Number</th>
        <th>Date of Admission</th>
        <th>Actions</th>
        </tr>
    </thead>
    <tbody id="usersTableBody"></tbody>`;
    // Add the table to the main container
    viewContainer.appendChild(tabla);

    // Fetch users from the API
    fetch(apiUrl)
        .then(res => res.json()) // Convert response to JSON
        .then(data => {
        // Get the table body
        const userT = document.getElementById('usersTableBody');
        // For each user, create a row in the table
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

            // Cell for action buttons
            const actionsCell = row.querySelector('td:last-child');

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            // On click, change hash to edit the user
            editBtn.addEventListener('click', () => {
                location.hash = `editar-${user.id}`;
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            // On click, call the function to delete the user
            deleteBtn.addEventListener('click', () => deleteUser(user.id));

            // Add buttons to the actions cell
            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);

            // Add the row to the table
            userT.appendChild(row);
        });
    });
};

// Function to render the create/edit user form
function renderizarFormulario(id = null) {
    // Create the form and its structure
    const form = document.createElement('form');
    form.id = 'userForm';
    form.innerHTML = `
    <h2>${id ? 'Edit User' : 'Create User'}</h2>
    <div class="form-group">
        <label for="name">Full Name:</label>
        <input type="text" id="name" required />
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" required />
    </div>
    <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" required />
    </div>
    <div class="form-group">
        <label for="enrollNumber">Enroll Number:</label>
        <input type="text" id="enrollNumber" required />
    </div>
    <div class="form-group">
        <label for="dateOfAdmission">Date of Admission:</label>
        <input type="date" id="dateOfAdmission" required />
    </div>
    <div class="form-actions">
        <button type="submit">Save</button>
    </div>`;

    // Add the form to the main container
    viewContainer.appendChild(form);

    // If id is provided, fetch user data and fill the form
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

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get form data
        const userData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            enrollNumber: form.enrollNumber.value,
            dateOfAdmission: form.dateOfAdmission.value
        };

        // Set method and URL depending on create or edit
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        // Send data to the API
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(() => {
            // After saving, go back to users view
            location.hash = 'usuarios';
        });
    });
};

// Function to delete a user
function deleteUser(id) {
    // Ask for confirmation before deleting
    if (confirm('Do you want to delete this user?')) {
        // Call the API to delete the user
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        }).then(() => cargarVista()); // Reload the view after deletion
    }
};

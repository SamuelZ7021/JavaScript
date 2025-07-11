// views/login.js

export function mostrarVistalogin() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <form id="login-form">
            <h2>Iniciar sesión</h2>
            <input type="text" name="username" placeholder="Usuario" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Entrar</button>
            <p id="mensaje-error" style="color: red;"></p>
        </form>
    `;

    const form = document.getElementById('login-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = form.username.value;
        const password = form.password.value;

    try {
        const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
        const data = await res.json();
            if (data.length > 0) {
                const usuario = data[0];
                sessionStorage.setItem('usuario', JSON.stringify(usuario));
                location.hash = 'home';
            } else {
                document.getElementById('mensaje-error').textContent = 'Usuario o contraseña incorrectos.';
            }
        } catch (error) {
            document.getElementById('mensaje-error').textContent = 'Error al conectar con el servidor.';
        }
    });
}

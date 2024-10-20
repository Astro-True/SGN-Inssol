function renderConfirmarView() {
    const html = `
    <div class="login-container">
        <h2 class="poppins-regular">Confirmar Contraseña</h2>
        <form id="confirmar-form">
            <div class="input-group">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Correo Electrónico" autocomplete="username" id="email">
            </div>
            <div class="input-group">
                <i class="fa-solid fa-lock"></i>
                <input type="number" placeholder="Código" id="code">
            </div>
            <div class="input-group">
                <i class="toggleNewPassword fa-solid fa-eye"></i>
                <input type="password" placeholder="Nueva Contraseña" autocomplete="new-password" class="form-newpassword" id="new-password">
            </div>
            <div class="input-group">
                <i class="toggleNewPassword fa-solid fa-eye"></i>
                <input type="password" placeholder="Repita Contraseña" autocomplete="new-password" class="form-newpassword" id="repeat-password">
            </div>
            <div class="ctr-btn-confirmar">
                <button class="btn-confirmar" id="btn-confi-true" type="submit">Aceptar</button>
                <button class="btn-confirmar" id="btn-confi-false" type="button">Cancelar</button>
            </div>
        </form>
    </div>
    <!-- Alerta personalizada -->
    <div id="custom-alert" class="custom-alert" style="display: none;">
        <div class="custom-alert-content">
            <p id="alert-message"></p>
            <button id="alert-ok-btn">OK</button>
        </div>
    </div>
    `;

    // Inserta el HTML en el contenedor principal
    const container = document.getElementById('layout');
    container.innerHTML = html;

    // Manejar eventos
    const btnAceptar = document.getElementById('btn-confi-true');
    const btnCancelar = document.getElementById('btn-confi-false');

    // Evento para el botón "Aceptar"
    btnAceptar.addEventListener('click', (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        // Aquí puedes agregar la lógica para procesar los datos antes de redirigir
        // Por ejemplo, validar los campos
        const email = document.getElementById('email').value;
        const code = document.getElementById('code').value;
        const newPassword = document.getElementById('new-password').value;
        const repeatPassword = document.getElementById('repeat-password').value;

        // Validar contraseñas
        if (newPassword !== repeatPassword) {
            document.getElementById('alert-message').innerText = 'Las contraseñas no coinciden.';
            document.getElementById('custom-alert').style.display = 'block';
            return;
        }

        // Si todo está bien, redirigir a la siguiente vista
        window.location.hash = '#/User'; // Cambia al hash #User o donde necesites redirigir
    });

    // Evento para el botón "Cancelar"
    btnCancelar.addEventListener('click', () => {
        window.location.hash = '#/User'; // Cambia al hash #User
    });
    window.addEventListener("hashchange", (e) => {
        const currentHash = window.location.hash; // Obtiene el hash actual
    
        // Evitar la recarga si regresa a User o va a confirmar
        if (currentHash === '#/User' || currentHash === '#/recuperar' || currentHash === '#/confirmar') {
            // No se hace nada, solo evitar la recarga
        } else {
            // Llama a la función rutas si el hash es diferente
            rutas(e);
        }
    });
}

// Cargar la vista cuando la página esté lista
document.addEventListener('DOMContentLoaded', renderConfirmarView);

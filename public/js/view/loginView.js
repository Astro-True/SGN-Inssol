function renderLoginView() {
    // const container = $("#view-container");
    // container.empty();
    const html = `
    <div class="login-container">
        <div class="logo">
            <img src="./img/logi.jpg" alt="Logo">
        </div>
        <h2>Iniciar Sesión</h2>
        <form id="login-form" action="AreaAdmin.html">
            <div class="input-group">
                <i class="fa-solid fa-user"></i>
                <input type="text" placeholder="Usuario" id="form-usuario" autocomplete="username">
            </div>
            <div class="input-group">
                <i class="fa-solid fa-lock" id="togglePassword"></i>
                <input type="password" placeholder="Ingrese Contraseña" id="form-password" autocomplete="current-password">
            </div>
            <a href="recuperar.html" class="forgot-password">¿Olvidaste tu contraseña?</a>
            <button type="submit" id="btn-ingresar">Ingresar</button>
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
    const container = document.getElementById('layout'); // Asegúrate de que este contenedor exista en tu HTML
    container.innerHTML = html;

    // Aquí puedes agregar event listeners o cualquier otro comportamiento que necesites
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario
        // Aquí puedes manejar la lógica de inicio de sesión
        const usuario = document.getElementById('form-usuario').value;
        const password = document.getElementById('form-password').value;
        console.log('Usuario:', usuario, 'Contraseña:', password);
        // Redirigir o mostrar un mensaje de éxito/error
    });
}

// Llama a la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', renderLoginView);

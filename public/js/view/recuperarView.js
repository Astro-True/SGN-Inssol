function renderRecuperarPasswordView() {
    const html = `
    <div class="login-container">
        <h2 class="poppins-regular">Recuperar Contraseña</h2>
        <form id="recuperar-form">
            <div class="input-groupp">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Correo Electrónico" id="email" required>
            </div>
            <div class="ctr-btn-recuperrar">
                <button class="btn-recuperrar" id="btn-rcpr-true" type="submit">Aceptar</button>
                <button class="btn-recuperrar" id="btn-rcpr-false" type="button">Cancelar</button>
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
    const container = document.getElementById('layout'); // Asegúrate de que este contenedor exista en tu HTML
    container.innerHTML = html;

    // Lógica de recuperación de contraseña
    document.getElementById('recuperar-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario
        const email = document.getElementById('email').value;

        console.log('Correo Electrónico:', email);
        
        // Aquí puedes realizar una solicitud AJAX para manejar la recuperación de contraseña
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/recuperar", // Endpoint del backend que manejará la recuperación de contraseña
            data: { email: email },
            success: function (response) {
                showAlert("Correo de recuperación enviado con éxito");
            },
            error: function (error) {
                showAlert("Error en la recuperación: " + error.responseText);
            },
        });
    });

    // Cancelar la acción
    document.getElementById('btn-rcpr-false').addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirige a la página de login al cancelar
    });

    // Mostrar alerta personalizada
    function showAlert(message) {
        document.getElementById('alert-message').innerText = message;
        document.getElementById('custom-alert').style.display = 'block';

        document.getElementById('alert-ok-btn').addEventListener('click', function() {
            document.getElementById('custom-alert').style.display = 'none';
        });
    }
}

// Llama a la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', renderRecuperarPasswordView);

function renderRecuperarView() {
    const html = `
    <div class="login-container">
        <h2 class="poppins-regular">Recuperar Contraseña</h2>
        <form>
            <div class="input-groupp">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Correo Electrónico" id="email">
            </div>
            <div class="ctr-btn-recuperrar">
                <button class="btn-recuperrar" id="btn-rcpr-true" type="submit">Aceptar</button>
                <button class="btn-recuperrar" id="btn-rcpr-false" type="submit">Cancelar</button>
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

    // Manejar eventos
    const btnAceptar = document.getElementById('btn-rcpr-true');
    const btnCancelar = document.getElementById('btn-rcpr-false');
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
    // Evento para el botón "Aceptar"
    btnAceptar.addEventListener('click', (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        // Aquí puedes agregar la lógica para procesar el correo electrónico antes de redirigir
        window.location.hash = '#/confirmar'; // Cambia al hash #confirmar
    });

    // Evento para el botón "Cancelar"
    btnCancelar.addEventListener('click', () => {
        window.location.hash = '#/User'; // Cambia al hash #User
    });
}

document.addEventListener('DOMContentLoaded', renderRecuperarView);

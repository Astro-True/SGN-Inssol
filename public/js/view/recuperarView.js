function renderRecuperarView() {
    const html = `
    <div class="login-container">
        <div class="logo"><img src="./img/logi.jpg" alt="Logo"></div>
        <h2 class="poppins-regular">Recuperar Contraseña</h2>
        <form id="recuperar-form">
            <div class="input-groupp">
                <input type="email" placeholder="Correo Electrónico" id="email">
            </div>
            <div id="rec-email-err" class="field-error">Introduce un correo válido</div>
            <div class="ctr-btn-recuperrar">
                <button class="btn-recuperrar" id="btn-rcpr-true" type="submit">Enviar</button>
                <button class="btn-recuperrar" id="btn-rcpr-false" type="button">Cancelar</button>
            </div>
        </form>
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
    // Manejo del formulario de recuperar
    document.getElementById('recuperar-form').addEventListener('submit', async (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        document.getElementById('rec-email-err').style.display='none';
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { document.getElementById('rec-email-err').style.display='block'; return; }
        try{
            // Llamada al endpoint de recupero (si existe)
            await $.ajax({ type:'POST', url: `${URL_SERVER}/Historialcontraseniarutas/`, data:{ correo: email } });
        } catch(err){ console.warn('Recuperar: endpoint no disponible o error', err); }
        await window.showDialog({title:'Recuperar', message:'Si el correo existe, recibirás instrucciones.', primaryText:'OK'});
        window.location.hash = '#/User';
    });

    // Evento para el botón "Cancelar"
    btnCancelar.addEventListener('click', () => {
        window.location.hash = '#/User'; // Cambia al hash #User
    });
}

document.addEventListener('DOMContentLoaded', renderRecuperarView);

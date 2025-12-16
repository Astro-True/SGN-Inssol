//import cookieManager from './constante.js';

function renderLoginView() {
    //const container = $("#view-container");
    //container.empty();
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
            <div id="user-error" class="field-error">El usuario es requerido</div>
            <div class="input-group">
                <i class="fa-solid fa-lock" id="togglePassword" style="cursor:pointer"></i>
                <input type="password" placeholder="Ingrese Contraseña" id="form-password" autocomplete="current-password">
            </div>
            <div id="pass-error" class="field-error">La contraseña es requerida</div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                            <a href="#/recuperar" class="forgot-password">¿Olvidaste tu contraseña?</a>
                            <a href="#/register" class="forgot-password" style="text-align:left">Crear cuenta</a>
                        </div>
            <button type="submit" id="btn-ingresar">Ingresar</button>
        </form>
    </div>

        <div id="md-overlay" class="md-overlay">
      <div class="md-dialog" role="dialog" aria-modal="true">
        <div class="md-title" id="md-title">Título</div>
        <div class="md-message" id="md-message">Mensaje</div>
        <div class="md-actions" id="md-actions"></div>
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
        // Validación simple
        const userErr = document.getElementById('user-error');
        const passErr = document.getElementById('pass-error');
        userErr.style.display = 'none'; passErr.style.display = 'none';
        if (!usuario) { userErr.style.display = 'block'; return; }
        if (!password) { passErr.style.display = 'block'; return; }
        // Deshabilitar botón y mostrar spinner
        const btn = document.getElementById('btn-ingresar');
        btn.disabled = true;
        const spinner = document.createElement('span'); spinner.className = 'md-spinner'; spinner.id='btn-spinner';
        btn.appendChild(spinner);

    $.ajax({
        type: "POST",
        url: `${URL_SERVER}/Autenticacion/login`, // Endpoint del backend que manejará el login
        data: { nombre: usuario, contrasenia: password },
        success:async function (response) {
            // Mostrar diálogo de éxito
            try{
                if (response.data) {
                    sessionStorage.setItem('userRole', JSON.stringify(response.data.rol));
                    const tokenData = (response.data.token);
                    await getPerfil(response.data.token);
                    if (window.cookieToken && typeof window.cookieToken.setEncryptedCookie === 'function') {
                        window.cookieToken.setEncryptedCookie('Token', response.data.token,1);
                    }
                    console.log('Login OK, token:', tokenData);
                }
                // Mostrar un toast breve y redirigir automáticamente
                await showToast('Inicio de sesión exitoso', 1800);
                window.location.href = 'AreaAdmin.html#/inicio';
            } catch(e) {
                console.error(e);
            } finally {
                // restaurar estado del botón
                const b = document.getElementById('btn-ingresar');
                const sp = document.getElementById('btn-spinner'); if (sp) sp.remove(); b.disabled=false;
            }
        },
        error: function (error) {
            // Preferir responseJSON.message si existe
            let msg = 'Error en la petición';
            if (error && error.responseJSON && error.responseJSON.message) msg = error.responseJSON.message;
            else if (error && error.responseText) {
                try { const j = JSON.parse(error.responseText); if (j && j.message) msg = j.message; else msg = error.responseText; } catch(e){ msg = error.responseText }
            }
            showDialog({title:'Error', message: msg, primaryText:'OK'});
            const b = document.getElementById('btn-ingresar'); const sp = document.getElementById('btn-spinner'); if (sp) sp.remove(); b.disabled=false;
        },
    });
    function getPerfil(token){
        console.log(URL_SERVER);
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: `${URL_SERVER}/Autenticacion/datos`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                //url: `${URL_SERVER}Autenticacion/datos/${dato.id}`,
                success:  (response) => {
                    console.log(response.data);
                    // const user = btoa(JSON.stringify(usuario));
                    // const profile=btoa(JSON.stringify(response.data));
                    const user = JSON.stringify(usuario); // Los datos sin encriptar
                    const profile = JSON.stringify(response.data);
                    // Cifrar los valores usando la clase Cookie
                    cookieManager.setEncryptedCookie('user', user, 1);
                    cookieManager.setEncryptedCookie('profile', profile, 1);
                    console.log("Datos cifrados guardados en cookies");
                    const decryptedProfile = cookieManager.getDecryptedCookie('profile');
                    console.log("Datos descifrados: ", JSON.parse(decryptedProfile));
                if (response.data) {
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                    resolve(true);
                } else {
                    reject(new Error("No se encontraron datos para el usuario."));
                }
                },
                error: function (error) {
                    showDialog({title:'Error', message: 'Error al obtener datos: ' + (error.responseText||''), primaryText:'OK'});
                    reject(false)
                    //reject(new Error("Error al obtener los datos: " + error.responseText));
                },
            });
        });
    }
});

// Toggle contraseña
document.getElementById('togglePassword').addEventListener('click', function(){
    const input = document.getElementById('form-password');
    if (input.type === 'password') { input.type = 'text'; this.classList.add('visible'); } else { input.type = 'password'; this.classList.remove('visible'); }
});

// Diálogo material simple
function showDialog({title='Info', message='', primaryText='OK', cancelText=null} = {}){
    return new Promise((resolve)=>{
        const overlay = document.getElementById('md-overlay');
        const t = document.getElementById('md-title');
        const m = document.getElementById('md-message');
        const actions = document.getElementById('md-actions');
        t.textContent = title; m.textContent = message;
        actions.innerHTML = '';
        if (cancelText) {
            const btnCancel = document.createElement('button'); btnCancel.className='md-btn'; btnCancel.textContent=cancelText;
            btnCancel.addEventListener('click', ()=>{ overlay.style.display='none'; resolve(false); });
            actions.appendChild(btnCancel);
        }
        const btnOk = document.createElement('button'); btnOk.className='md-btn primary'; btnOk.textContent=primaryText;
        btnOk.addEventListener('click', ()=>{ overlay.style.display='none'; resolve(true); });
        actions.appendChild(btnOk);
        overlay.style.display = 'flex';
    });
}

// Toast breve que se cierra automáticamente
function showToast(message, ms = 1800){
    return new Promise((resolve)=>{
        let toast = document.getElementById('md-toast');
        if (!toast) {
            toast = document.createElement('div'); toast.id = 'md-toast';
            toast.style.position = 'fixed'; toast.style.left = '50%'; toast.style.top = '18%'; toast.style.transform = 'translateX(-50%)';
            toast.style.background = 'rgba(0,0,0,0.8)'; toast.style.color = '#fff'; toast.style.padding = '10px 16px';
            toast.style.borderRadius = '8px'; toast.style.zIndex = 10000; toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.opacity = '1'; toast.style.display = 'block';
        setTimeout(()=>{ toast.style.transition = 'opacity 300ms'; toast.style.opacity = '0'; setTimeout(()=>{ toast.style.display='none'; resolve(true); }, 300); }, ms);
    });
}

// class Cookie {
//     // Método para establecer una cookie
//     setCookie(nombre, valor, dias) {
//         let expires = "";
//         if (dias) {
//             const date = new Date();
//             date.setTime(date.getTime() + (dias * 24 * 60 * 60 * 1000)); // Convertir días a milisegundos
//             expires = `; expires=${date.toUTCString()}`;
//         }
//         document.cookie = `${nombre}=${valor || ""}${expires}; path=/`;
//     }

//     // Método para obtener el valor de una cookie
//     getCookieValue(nombre) {
//         const cookies = document.cookie.split(";"); // Divide la cadena de cookies en un array
//         for (let i = 0; i < cookies.length; i++) {
//             let cookie = cookies[i].trim(); // Elimina espacios en blanco al principio y al final
//             if (cookie.startsWith(nombre + "=")) {
//                 return cookie.substring(nombre.length + 1); // Retorna el valor de la cookie
//             }
//         }
//         return null; // Si no se encuentra la cookie, retorna null
//     }
//     // Método para cifrar y almacenar una cookie
//     setEncryptedCookie(nombre, valor, dias) {
//         const encryptedValue = btoa(valor); // Cifrar usando Base64
//         this.setCookie(nombre, encryptedValue, dias);
//         console.log(encryptedValue);
//     }

//     // Método para obtener y descifrar una cookie
//     getDecryptedCookie(nombre) {
//         const encryptedValue = this.getCookieValue(nombre);
//         if (encryptedValue) {
//             return atob(encryptedValue); // Descifrar usando Base64
//         }
//         return null;
//     }
// }
// const cookieManager = new Cookie();
// const cookieToken  = new Cookie();


// Manejador para el cambio de hash
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
document.addEventListener('DOMContentLoaded', renderLoginView);

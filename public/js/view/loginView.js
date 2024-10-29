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
            <div class="input-group">
                <i class="fa-solid fa-lock" id="togglePassword"></i>
                <input type="password" placeholder="Ingrese Contraseña" id="form-password" autocomplete="current-password">
            </div>
            <a href="#/recuperar" class="forgot-password">¿Olvidaste tu contraseña?</a>
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
    
    $.ajax({
        type: "POST",
        url: `${URL_SERVER}/Autenticacion/login`, // Endpoint del backend que manejará el login
        data: { nombre: usuario, contrasenia: password },
        success:async function (response) {
            alert("Login exitoso");
            if (response.data) {
                //sessionStorage.setItem('userRole', response.data.rol);
                //sessionStorage.setItem('userRole', JSON.stringify(response.data));
                sessionStorage.setItem('userRole', JSON.stringify(response.data.rol));
                console.log(response.data)
                const tokenData = (response.data.token);
                await getPerfil(response.data.token);
                cookieToken.setEncryptedCookie('Token', response.data.token,1);
                console.log(tokenData);
            }

            // Redirigir a la página de administración
            if (confirm('¿Deseas ir a la página de confirmación?')) {
                window.location.href = 'AreaAdmin.html#/inicio';
            }
        },
        error: function (error) {
            alert("Error en el login: " + error.responseText);
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
                    alert("Error en el obtener de datos: " + error.responseText);
                    reject(false)
                    //reject(new Error("Error al obtener los datos: " + error.responseText));
                },
            });
        });
    }
});

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

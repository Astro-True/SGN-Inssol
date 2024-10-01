document.addEventListener('DOMContentLoaded', function () {
    /*****************
    *  login.html    *
    ******************/
    // Campo de usuario: Restringir a solo letras
    document.getElementById('form-usuario')?.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^a-zA-Z]/g, '');
    });
    // Alternar visibilidad de la contraseña
    document.getElementById('togglePassword')?.addEventListener('click', function () {
        const passwordInput = document.getElementById('form-password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Alternar la visibilidad del ícono
        this.classList.toggle('fa-lock');
        this.classList.toggle('fa-lock-open');
    });


    /*****************
    * recuperar.html *
    ******************/
    // Redirección de botones
    document.querySelector('#btn-rcpr-true')?.addEventListener('click', function (event) {
        event.preventDefault();
       // window.location.href = './confirmar.html';
    });
    document.querySelector('#btn-rcpr-false')?.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = './login.html';
    });


    /*****************
    * confirmar.html *
    ******************/
    // Alternar visibilidad de la contraseña
    document.querySelectorAll('.toggleNewPassword').forEach(toggleNewPassword => {
        toggleNewPassword.addEventListener('click', function () {
            const passwordInput = this.parentElement.querySelector('.form-newpassword');
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            }
        });
    });
    // Redirección de botones
    document.querySelector('#btn-confi-true')?.addEventListener('click', function (event) {
        event.preventDefault();
        //window.location.href = './login.html';
    });
    document.querySelector('#btn-confi-false')?.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = './recuperar.html';
    });

    
    //obligacion de llenado de campo obligatorio
/*
    document.getElementById('btn-ingresar')?.addEventListener('click', function (event) {
        const username = document.getElementById('form-usuario')?.value.trim();
        const password = document.getElementById('form-password')?.value.trim();

        if (!username || !password) {
            event.preventDefault(); // Evitar el envío del formulario
            alert('Por favor, complete todos los campos obligatorios: Usuario y Contraseña.');
        }
    });

    // Validar formulario de correo electrónico
    document.getElementById('btn-rcpr-true')?.addEventListener('click', function (event) {
        const email = document.getElementById('email')?.value.trim();

        if (!email) {
            event.preventDefault(); // Evitar el envío del formulario
            alert('Por favor, ingrese su correo electrónico.');

        }
    });

    // Validar formulario de nueva contraseña y repetición
    document.getElementById('btn-confi-true')?.addEventListener('click', function (event) {
        const newPassword = document.getElementById('new-password')?.value.trim();
        const repeatPassword = document.getElementById('repeat-password')?.value.trim();

        if (!newPassword || !repeatPassword) {
            event.preventDefault(); // Evitar el envío del formulario
            alert('Por favor, ingrese y repita su nueva contraseña.');
        } else if (newPassword !== repeatPassword) {
            event.preventDefault(); // Evitar el envío del formulario
            alert('Las contraseñas no coinciden.');
        }
    });
*/
    function showCustomAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        const okButton = document.getElementById('alert-ok-btn');

        // Establecer el mensaje de la alerta
        alertMessage.textContent = message;

        // Mostrar la alerta
        alertBox.style.display = 'flex';

        // Ocultar la alerta al hacer clic en "OK"
        okButton.addEventListener('click', function () {
            alertBox.style.display = 'none';
        });
    }

    // Ejemplo: Validación personalizada en un formulario
    document.getElementById('btn-ingresar')?.addEventListener('click', function (event) {
        const username = document.getElementById('form-usuario')?.value.trim();
        const password = document.getElementById('form-password')?.value.trim();

        if (!username || !password) {
            event.preventDefault(); // Evitar el envío del formulario
            showCustomAlert('Por favor, complete todos los campos obligatorios: Usuario y Contraseña.');
        }
    });

    document.getElementById('btn-rcpr-true')?.addEventListener('click', function (event) {
        const email = document.getElementById('email')?.value.trim();

        if (!email) {
            event.preventDefault(); // Evitar el envío del formulario
            showCustomAlert('Por favor, ingrese su correo electrónico.');
        }else{
            window.location.href = './confirmar.html';
        }
    });

    document.getElementById('btn-confi-true')?.addEventListener('click', function (event) {
        const newPassword = document.getElementById('new-password')?.value.trim();
        const repeatPassword = document.getElementById('repeat-password')?.value.trim();

        if (!newPassword || !repeatPassword) {
            event.preventDefault(); // Evitar el envío del formulario
            showCustomAlert('Por favor, ingrese y repita su nueva contraseña.');
        } else if (newPassword !== repeatPassword) {
            event.preventDefault(); // Evitar el envío del formulario
            showCustomAlert('Las contraseñas no coinciden.');
        }else{
        window.location.href = './login.html';

        }
    });

});

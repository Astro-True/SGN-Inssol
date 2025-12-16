function renderRegisterView(){
    const html = `
    <div class="login-container">
      <div class="logo"><img src="./img/logi.jpg" alt="Logo"></div>
      <h2>Registro de Usuario</h2>
      <form id="register-form">
        <div class="input-group"><i class="fa-solid fa-envelope"></i><input id="reg-email" type="email" placeholder="Correo electrónico"></div>
        <div id="reg-email-err" class="field-error">Correo inválido</div>
        <div class="input-group"><i class="fa-solid fa-lock"></i><input id="reg-pass" type="password" placeholder="Contraseña"></div>
        <div class="input-group"><i class="fa-solid fa-lock"></i><input id="reg-pass2" type="password" placeholder="Confirmar contraseña"></div>
        <div id="reg-pass-err" class="field-error">Las contraseñas no coinciden</div>
        <button id="btn-register" type="submit">Crear cuenta</button>
      </form>
    </div>
    `;
    const container = document.getElementById('layout');
    container.innerHTML = html;

    document.getElementById('register-form').addEventListener('submit', async (e)=>{
        e.preventDefault();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-pass').value;
        const pass2 = document.getElementById('reg-pass2').value;
        document.getElementById('reg-email-err').style.display='none';
        document.getElementById('reg-pass-err').style.display='none';
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { document.getElementById('reg-email-err').style.display='block'; return; }
        if (!pass || pass !== pass2) { document.getElementById('reg-pass-err').style.display='block'; return; }
        const btn = document.getElementById('btn-register'); btn.disabled=true;
        try {
            // Intentar crear usuario vía API (endpoint público /Usuario/registrar)
            const res = await $.ajax({ type:'POST', url:`${URL_SERVER}/Usuario/registrar`, data:{ nombre: email, contrasenia: pass } });
            await window.showDialog({title:'Registro', message:'Cuenta creada con éxito', primaryText:'Ir a login'});
            window.location.hash = '#/User';
        } catch(err){
            console.error(err);
            await window.showDialog({title:'Error', message: (err.responseText||'No se pudo crear la cuenta'), primaryText:'OK'});
        } finally { btn.disabled=false; }
    });
}

// Exponer globalmente para rutas.js
document.addEventListener('DOMContentLoaded', ()=>{
  if (window.location.hash === '#/register') renderRegisterView();
});

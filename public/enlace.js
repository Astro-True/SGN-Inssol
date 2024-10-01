$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();

    // var username = $("input[name='username']").val();
    // var password = $("input[name='password']").val();

    var username = $("#form-usuario").val();
    var password = $("#form-password").val();

    // $.ajax({
    //   type: "POST",
    //   url: "http://localhost:3000/login", // Endpoint del backend que manejará el login
    //   url: "http://192.168.1.41/Usuario", // Endpoint del backend que manejará el login
    //   data: { username: username, password: password },
    //   success: function (response) {
    //     alert("Login exitoso");
    //     // Aquí podrías redirigir o hacer alguna acción tras un login exitoso
    //     // window.location.href = 'AreaAdmin.html';
            if (confirm('¿Deseas ir a la página de confirmación?')) {
              window.location.href = 'AreaAdmin.html';
            }
    //   },
    //   error: function (error) {
    //     alert("Error en el login: " + error.responseText);
    //   },
    // });
    console.log();
    console.log(username);
    console.log(password);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll(".myButton, .forgot-password, .User").forEach((button) => {
    if (button) {
      button.addEventListener("click", function (event) {
        if (button.classList.contains("forgot-password")) {
          event.preventDefault();
        }
        const ruta = button.classList.contains("forgot-password") 
          ? button.getAttribute("href") 
          : button.getAttribute("data-view");
        window.location.hash = ruta;
        rutas();
      });
    }
  });
});
// Función para cargar scripts de manera dinámica
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");// Crea un elemento <script>
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}
// Función para cambiar dinámicamente la hoja de estilos (CSS)
function changeStylesheet(cssFile) {
  // Remueve la hoja de estilos 'roles.css' si está cargada
  removeStylesheet("roles.css");
  removeStylesheet("login.css");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `./css/${cssFile}`;
  link.type = "text/css";
  document.head.appendChild(link);
}
// Función auxiliar para remover una hoja de estilo por su 'href'
function removeStylesheet(href) {
  // Selecciona todas las hojas de estilo con el href correspondiente
  const links = document.querySelectorAll(`link[href*="${href}"]`);
  links.forEach((link) => link.parentNode.removeChild(link));
}

// Función que maneja las rutas de la aplicación basadas en el hash de la URL
function rutas() {
  let path = window.location.hash.substring(1);
  console.log(path);
  // Resetear clases de estilo para manejar diferentes rutas
  const container = document.getElementById("view-container");
  if(container=="view-container"){
  container.classList.remove("agregar-active");}
  // Manejo de clases activas en los botones según la ruta actual
  document.querySelectorAll(".myButton").forEach((button) => {
    const ruta = button.getAttribute("data-view");
    if (ruta === path) {
      // Agrega la clase 'active' al botón actual
      button.classList.add("active");
        container.classList.remove("agregar-active");
    } else {
      // Remueve la clase 'active' de los demás botones
      button.classList.remove("active");
    }
  });
  // Rutas específicas y scripts asociados que deben cargarse según el hash actual
  if (path === "/inicio") {
    console.log("/inicio");
    // Cambia el estilo a 'AreaAdmin.css'
    changeStylesheet("AreaAdmin.css");
    // Carga dinámicamente el script 'inicio.js'
    loadScript("./js/view/inicio.js")
      .then(() => {
        console.log("Script de Inicio cargado");
        if (typeof renderInicio === "function") {
          removeStylesheet("login.css");
          renderInicio();
        } else {
          console.error("La función renderInicio no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Inicio:", err);
      });
  }

  // Cargar y renderizar la vista de usuarios
  if (path === "/usuario") {
    console.log("/usuario");
    changeStylesheet("AreaAdmin.css");
    loadScript("./js/view/usuario.js")
      .then(() => {
        console.log("Script de Usuario cargado");
        if (typeof renderUsuario === "function") {
          renderUsuario();
        } else {
          console.error("La función renderUsuario no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Usuario:", err);
      });
  }
  // Cargar y renderizar la vista de docentes
  if (path === "/docente") {
    console.log("/docente");
    changeStylesheet("AreaAdmin.css");
    loadScript("./js/view/docente.js")
      .then(() => {
        console.log("Script de Docente cargado");
        if (typeof renderDocente === "function") {
          renderDocente();
        } else {
          console.error("La función renderDocente no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Docente:", err);
      });
  }
  // Cargar y renderizar la vista de roles
  if (path === "/roles") {
    console.log("/roles");
    changeStylesheet("roles.css");
    loadScript("./js/view/roles.js")
      .then(() => {
        console.log("Script de Roles cargado");
        if (typeof renderRoles === "function") {
          renderRoles();
        } else {
          console.error("La función renderRoles no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Roles:", err);
      });
  }
  // Cargar y renderizar la vista de añadir usuarios
  if (path === "Usuario/Agregar") {
    console.log("/Agregar");
    changeStylesheet("AreaAdmin.css");
    container.classList.add("agregar-active");
    loadScript("./js/view/agregar.js")
      .then(() => {
        console.log("Script de Añadir cargado");
        if (typeof renderAgregar === "function") {
          renderAgregar();
        } else {
          console.error("La función renderAgregar no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Agregar:", err);
      });
  }
  // Cargar y renderizar la vista de edición de usuarios
  if (path.includes("/Usuario/Editar")) {
    console.log("/Editar");
    changeStylesheet("AreaAdmin.css");
    container.classList.add("agregar-active");
    // Obtener ID del usuario a editar desde los parámetros de la URL
    const id = new URLSearchParams(path.split('?')[1]);
    console.log(id.has('idUsuario'));
    console.log(id.get('idUsuario'));
    loadScript("./js/view/editar.js")
      .then(() => {
        console.log("Script de Editar cargado");
        if (typeof obtenerDatosUsuario === "function") {
          // Llama a la función para obtener los datos del usuario
          obtenerDatosUsuario(id.get('idUsuario'));
        } else {
          console.error("La función obtenerDatosUsuario no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Editar:", err);
      });
  }
  // Cargar y renderizar la vista de edición de Login
  if (path === "/User") {
    console.log("/User");
    changeStylesheet("login.css");
    loadScript("./js/view/loginView.js")
      .then(() => {
        console.log("Script de Inicio cargado");
        if (typeof renderLoginView === "function") {
          renderLoginView();
        } else {
          console.error("La función renderInicio no está definida");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el script de Inicio:", err);
      });
  }
  // Cargar y renderizar la vista de edición de recuperar
  if (path === "/recuperar") {
    console.log("Cargando vista de recuperar");
    changeStylesheet("login.css");
    loadScript("./js/view/recuperarView.js")
        .then(() => {
            console.log("Script de recuperar cargado");
            if (typeof renderRecuperarView === "function") {
                renderRecuperarView();
            } else {
                console.error("La función renderRecuperarView no está definida");
            }
        })
        .catch((err) => {
            console.error("Error al cargar el script de Recuperar:", err);
        });
  }
  // Cargar y renderizar la vista de edición de Confirmar
  if (path === "/confirmar") {
    console.log("Cargando vista de confirmar");
    changeStylesheet("login.css");
    loadScript("./js/view/confirmarView.js")
        .then(() => {
            console.log("Script de recuperar cargado");
            if (typeof renderConfirmarView === "function") {
              renderConfirmarView();
            } else {
                console.error("La función renderConfirmarView no está definida");
            }
        })
        .catch((err) => {
            console.error("Error al cargar el script de Confirmar:", err);
        });
  }
}
// Manejador de cambio de hash para llamar a rutas y validar permisos
$(window).on('hashchange', function() {
  rutas(); // Ejecuta la lógica de rutas
});
window.addEventListener("hashchange", (e) => {
  const currentHash = window.location.hash; // Obtiene el hash actual
  if (currentHash === "#/User" || currentHash === "#/recuperar" || currentHash === "#/confirmar") {
    localStorage.setItem('wasUserHash', 'true'); // Establece un valor en localStorage
  } else {
    // Si cambias de #/User a otro hash y estaba en #/User
    if (localStorage.getItem('wasUserHash') === 'true') {
      localStorage.removeItem('wasUserHash'); // Elimina el valor de localStorage
      window.location.reload(); // Recarga la página
    }
  }
  rutas(e);
});
$(document).ready(() => {
  if (!window.location.hash) {
    window.location.hash = "#/User";
  }
  rutas("");
});



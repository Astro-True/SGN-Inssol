// Selecciona todos los botones con la clase 'myButton' y añade un evento 'click' a cada uno
document.querySelectorAll(".myButton").forEach((button) => {
  button.addEventListener("click", function () {
    // Obtiene la ruta definida en 'data-view' del botón
    const ruta = button.getAttribute("data-view");
    // Actualiza el hash de la URL
    window.location.hash = ruta;
    rutas();
  });
});

// Función para cargar scripts de manera dinámica
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Crea un elemento <script>
    const script = document.createElement("script");
    // Define la ruta del script
    script.src = src;
    // Resuelve la promesa cuando el script se ha cargado
    script.onload = resolve;
    // Rechaza la promesa si ocurre un error
    script.onerror = reject;
    // Añade el script al DOM
    document.body.appendChild(script);
  });
}

// Función para cambiar dinámicamente la hoja de estilos (CSS)
function changeStylesheet(cssFile) {
  // Remueve la hoja de estilos 'roles.css' si está cargada
  removeStylesheet("roles.css");
  // Crea un nuevo elemento <link>
  const link = document.createElement("link");
  // Define que es una hoja de estilos
  link.rel = "stylesheet";
  // Establece la ruta dinámica del archivo CSS
  link.href = `./css/${cssFile}`;
  link.type = "text/css";
  // Añade la hoja de estilos al <head>
  document.head.appendChild(link);
}

// Función auxiliar para remover una hoja de estilo por su 'href'
function removeStylesheet(href) {
  // Selecciona todas las hojas de estilo con el href correspondiente
  const links = document.querySelectorAll(`link[href*="${href}"]`);
  // Remueve la hoja de estilo del DOM
  links.forEach((link) => link.parentNode.removeChild(link));
}

// Función que maneja las rutas de la aplicación basadas en el hash de la URL
function rutas() {
  // Obtiene el valor del hash sin el '#'
  let path = window.location.hash.substring(1);
  console.log(path);
  // Resetear clases de estilo para manejar diferentes rutas
  const container = document.getElementById("view-container");
  container.classList.remove("agregar-active");
  // Manejo de clases activas en los botones según la ruta actual
  document.querySelectorAll(".myButton").forEach((button) => {
    const ruta = button.getAttribute("data-view");
    if (ruta === path) {
      // Agrega la clase 'active' al botón actual
      button.classList.add("active");
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
}

// Escuchar cambios en el hash de la URL
window.addEventListener("hashchange", (e) => {
  // Ejecutar la función 'rutas' cada vez que cambia el hash
  rutas(e);
});

// Ejecutar la función rutas al cargar el documento
$(document).ready(() => {
  // Inicializar las rutas
  rutas("");
});

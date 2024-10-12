// Función para renderizar el formulario de "Agregar Usuario"
function renderAgregar() {
    // Selecciona el contenedor donde se va a insertar el formulario
    const container = $("#view-container");
    // Limpia el contenido del contenedor para evitar duplicados
    container.empty();
    // Plantilla del formulario en HTML
    const formHTML = `
        <div id="form-container">
            <h2>Agregar Usuario</h2>
            <form id="add-form">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required autocomplete="username">
                </div>
                <div class="form-group">
                    <label for="contrasenia">Contraseña:</label>
                    <input type="password" id="contrasenia" name="contrasenia" required autocomplete="current-password">
                </div>
                <div class="form-group">
                    <label for="ci">CI:</label>
                    <input type="text" id="ci" name="ci" required>
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono:</label>
                    <input type="text" id="telefono" name="telefono" required>
                </div>
                <div class="form-group">
                    <label for="correo">Correo:</label>
                    <input type="email" id="correo" name="correo" required>
                </div>
                <div class="form-group">
                    <label for="fechanacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="fechanacimiento" name="fechanacimiento" required>
                </div>
                <div class="form-group">
                    <label for="domicilio">Domicilio:</label>
                    <input type="text" id="domicilio" name="domicilio" required>
                </div>
                <div class="form-group">
                    <label for="gradoacademico">Grado Académico:</label>
                    <input type="text" id="gradoacademico" name="gradoacademico" required>
                </div>
                <div class="form-group">
                    <label for="areaespecializacion">Área de Especialización:</label>
                    <input type="text" id="areaespecializacion" name="areaespecializacion" required>
                </div>
                <div class="form-group">
                    <label for="grado">Grado:</label>
                    <input type="text" id="grado" name="grado" required>
                </div>
                <div class="form-group">
                    <label for="roles">Rol:</label>
                        <select name="Rol" id="Rol">
                            <option value="admin">Administrador</option>
                            <option value="docente">Docente</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="invitado">Invitado</option>
                        </select>
                </div>
                <div class="btn-form">
                    <button class="button-28" type="submit" id="enviar-form"><span class="text">Enviar</span></button>
                    <button class="button-28" type="button" id="cancelar-form">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    // Inserta el formulario en el contenedor
    container.append(formHTML);
    // Configura el comportamiento del formulario
    configurarFormulario();
}

// Función para configurar los eventos del formulario
function configurarFormulario() {
    // Añade un evento al botón de cancelar que redirige a la vista de usuarios
    document.getElementById("cancelar-form").addEventListener("click", function () {
        window.location.hash = '/usuario'; // Actualiza el hash de la URL para redirigir
        //rutas(); // Llama a la función 'rutas' para cambiar la vista
    });

    // Maneja el envío del formulario
    document.getElementById("add-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario (no recargar la página)

        const formData = new FormData(this); // Obtiene los datos del formulario
        const data = {}; // Crear un objeto para almacenar los datos

        // Recorre los datos del formulario y los guarda en el objeto 'data'
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Realiza una solicitud POST al servidor para crear el usuario
        fetch(`${URL_SERVER}/Usuario/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica que los datos se envían en formato JSON
            },
            body: JSON.stringify(data) // Convierte los datos a una cadena JSON
        })
        // Maneja la respuesta de la solicitud
        .then(result => {
            alert('Usuario agregado exitosamente'); // Muestra un mensaje de éxito
            document.getElementById("add-form").reset(); // Reinicia el formulario
            window.location.hash = '/usuario'; // Redirige a la vista de usuarios
            //rutas(); // Actualiza la vista
        })
        .catch(error => {
            console.error('Error:', error); // Muestra el error en la consola
            alert('Hubo un error al agregar el usuario'); // Muestra un mensaje de error
        });
    });
}

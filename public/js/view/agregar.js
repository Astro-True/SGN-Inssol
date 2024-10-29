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
                <input type="text" id="nombre" name="nombre" required maxlength="50" pattern="[A-Za-z\s]+" title="Solo se permiten letras y espacios.">
            </div>
            <div class="form-group">
                <label for="contrasenia">Contraseña:</label>
                <input type="password" id="contrasenia" name="contrasenia" required minlength="8" pattern="(?=.*[0-9])(?=.*[a-zA-Z]).{8,}" title="La contraseña debe tener al menos 8 caracteres y contener letras y números.">
            </div>
            <div class="form-group">
                <label for="ci">CI:</label>
                <input type="text" id="ci" name="ci" required pattern="^[0-9]{5,15}$" title="El CI debe tener entre 5 y 15 dígitos.">
            </div>
            <div class="form-group">
                <label for="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" required pattern="^\+?[0-9]{7,15}$" title="El teléfono debe contener entre 7 y 15 dígitos, con opción de un prefijo internacional.">
            </div>
            <div class="form-group">
                <label for="correo">Correo:</label>
                <input type="email" id="correo" name="correo" required>
            </div>
            <div class="form-group">
                <label for="fechanacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fechanacimiento" name="fechanacimiento" required max="2006-12-31" title="Debes ser mayor de 18 años.">
            </div>
            <div class="form-group">
                <label for="domicilio">Domicilio:</label>
                <input type="text" id="domicilio" name="domicilio" required maxlength="100">
            </div>
            <div class="form-group">
                <label for="gradoacademico">Grado Académico:</label>
                <input type="text" id="gradoacademico" name="gradoacademico" required maxlength="50">
            </div>
            <div class="form-group">
                <label for="areaespecializacion">Área de Especialización:</label>
                <input type="text" id="areaespecializacion" name="areaespecializacion" required maxlength="50">
            </div>
            <div class="form-group">
                <label for="grado">Grado:</label>
                <input type="text" id="grado" name="grado" required maxlength="50">
            </div>
            <div class="form-group">
                <label for="roles">Rol:</label>
                <select id="select-roles" name="roleid" required>
                    <option value="">Seleccione un rol</option>
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
    cargarRolesEnSelect();
}
function configurarFormulario() {
    // Añade un evento al botón de cancelar que redirige a la vista de usuarios
    document.getElementById("cancelar-form").addEventListener("click", function () {
        window.location.hash = '/usuario'; // Actualiza el hash de la URL para redirigir
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
        const token = cookieManager.getDecryptedCookie(TOKEN);
        // Realiza una solicitud POST al servidor para crear el usuario
        $.ajax({
            url: `${URL_SERVER}/Usuario/crear`,
            type: 'POST',
            contentType: 'application/json', // Especifica que los datos se envían en formato JSON
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data), // Convierte los datos a una cadena JSON
            success: function(result) {
                alert('Usuario agregado exitosamente'); // Muestra un mensaje de éxito
                document.getElementById("add-form").reset(); // Reinicia el formulario
                window.location.hash = '/usuario'; // Redirige a la vista de usuarios
            },
            error: function(xhr, status, error) {
                console.error('Error:', error); // Muestra el error en la consola
                alert('Hubo un error al agregar el usuario'); // Muestra un mensaje de error
            }
        });
    });
}

// Función para obtener los roles desde el servidor y cargarlos en el select
function cargarRolesEnSelect() {
    const selectRoles = $('#select-roles');
    const url = `${URL_SERVER}/Roles/lista`;
    const token = cookieManager.getDecryptedCookie(TOKEN);

    $.ajax({
        url: url,
        type: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        success: function(roles) {
            selectRoles.empty().append('<option id="roleid" value="">Seleccione un rol</option>');
            roles.forEach(rol => {
                selectRoles.append($('<option>', {
                    value: rol.id,
                    text: rol.nombre
                }));
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al cargar los roles:', errorThrown);
        }
    });
}
// Llamada a la función para cargar los roles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderAgregar);


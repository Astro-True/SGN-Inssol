function renderRoles() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
        <div class="content-agregar">
            <div class="Add-Update" data-view="Usuario" id="btn-Actualizar">Actualizar</div>
        </div>
        <table id="datos-tabla">
            <thead>
                <tr>
                    <th rowspan="2" class="header">Rol</th>
                    <th colspan="6" class="header">Acceso A:</th>
                </tr>
                <tr>
                    <th>Usuario</th>
                    <th>Docente</th>
                    <th>Roles</th>
                    <th>Cursos</th>
                    <th>Horario</th>
                    <th>Grado</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    container.append(tablaHTML);
    // Evento para el botón "Actualizar"
    $("#btn-Actualizar").on('click', () => {
        obtenerDatos();
    });
    obtenerDatos();
}
function cargarDatosEnTabla(datos) {
    const tabla = $('#datos-tabla tbody');
    // Ordenar datos por nombre
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    tabla.empty(); // Limpiar la tabla
    datos.forEach(dato => {
        let fila = $('<tr></tr>');
        fila.append(`<td class="role">${dato.nombre}</td>`);
        fila.append(`<td><input type="checkbox" ${dato.usuario ? 'checked' : ''} data-id="${dato.id}" data-field="Usuario"></td>`);
        fila.append(`<td><input type="checkbox" ${dato.docente ? 'checked' : ''} data-id="${dato.id}" data-field="Docente"></td>`);
        fila.append(`<td><input type="checkbox" ${dato.roles ? 'checked' : ''} data-id="${dato.id}" data-field="Roles"></td>`);
        fila.append(`<td><input type="checkbox" ${dato.cursos ? 'checked' : ''} data-id="${dato.id}" data-field="Cursos"></td>`);
        fila.append(`<td><input type="checkbox" ${dato.horarios ? 'checked' : ''} data-id="${dato.id}" data-field="Horarios"></td>`);
        fila.append(`<td><input type="checkbox" ${dato.grados ? 'checked' : ''} data-id="${dato.id}" data-field="Grados"></td>`);
        tabla.append(fila);
    });
    // Añadir evento a los checkboxes
    $('input[type="checkbox"]').change(function(event) {
        const id = $(this).data('id');
        const field = $(this).data('field');
        const value = this.checked;
        actualizarAcceso(id, field, value);
    });
}
function actualizarAcceso(id, field, value) {
    const url = `${URL_SERVER}/Roles/actualizar`;
    const token = cookieManager.getDecryptedCookie(TOKEN);
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ id, field, value }),
        success: function(data) {
            console.log('Actualización exitosa:', data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Hubo un problema con la actualización:', textStatus, errorThrown);
            alert('Error al actualizar el acceso. Por favor, inténtelo de nuevo.'); // Notificación al usuario
        }
    });
}
function obtenerDatos() {
    // URL del servidor donde se obtienen los datos
    const url = `${URL_SERVER}/Roles/lista`;
    const token = cookieManager.getDecryptedCookie(TOKEN);
    $.ajax({
        url: url,
        type: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Enviar el token en el encabezado
            "Content-Type": "application/json"
        },
        success: function(datos) {
            // Llama a la función para cargar los datos en la tabla
            cargarDatosEnTabla(datos);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Hubo un problema con la solicitud:', errorThrown);
            // Muestra un error en el DOM si falla
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        }
    });
}

document.addEventListener('DOMContentLoaded', renderRoles);

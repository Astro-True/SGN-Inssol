function renderRoles() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
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
    obtenerDatos();
}

// Función para cargar los datos de usuarios en la tabla
function cargarDatosEnTabla(datos) {
    // Selecciona el cuerpo de la tabla
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    // Ordena los usuarios por nombre
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    // Limpia la tabla antes de agregar los nuevos datos
    tabla.innerHTML = '';
    // Itera sobre los datos de los usuarios
    datos.forEach(dato => {
        // Inserta una nueva fila en la tabla
        let fila = tabla.insertRow();

        // Añade la celda con el nombre del rol y le aplica la clase "role"
        let celdaRol = fila.insertCell(0);
        celdaRol.textContent = dato.nombre;  // Asigna el texto (nombre del rol)
        celdaRol.className = 'role';         // Asigna la clase "role"
        fila.insertCell(1).innerHTML = `<input type="checkbox" ${dato.usuario ? 'checked' : ''} data-id="${dato.id}" data-field="Usuario">`;
        fila.insertCell(2).innerHTML = `<input type="checkbox" ${dato.docente ? 'checked' : ''} data-id="${dato.id}" data-field="Docente">`;
        fila.insertCell(3).innerHTML = `<input type="checkbox" ${dato.roles ? 'checked' : ''} data-id="${dato.id}" data-field="Roles">`;
        fila.insertCell(4).innerHTML = `<input type="checkbox" ${dato.cursos ? 'checked' : ''} data-id="${dato.id}" data-field="Cursos">`;
        fila.insertCell(5).innerHTML = `<input type="checkbox" ${dato.horarios ? 'checked' : ''} data-id="${dato.id}" data-field="Horarios">`;
        fila.insertCell(6).innerHTML = `<input type="checkbox" ${dato.grados ? 'checked' : ''} data-id="${dato.id}" data-field="Grados">`;

    });

    // Añadir evento a los checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const id = event.target.getAttribute('data-id');
            const field = event.target.getAttribute('data-field');
            const value = event.target.checked;

            actualizarAcceso(id, field, value);
        });
    });
}

// Función para actualizar el estado de acceso en el backend
function actualizarAcceso(id, field, value) {
    const url = `${URL_SERVER}/Roles/actualizar`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, field, value })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el acceso');
            }
            return response.json();
        })
        .then(data => {
            console.log('Actualización exitosa:', data);
        })
        .catch(error => {
            console.error('Hubo un problema con la actualización:', error);
        });

}



// Función para obtener los datos desde el servidor
function obtenerDatos() {
    // URL del servidor donde se obtienen los datos
    const url = `${URL_SERVER}/Roles/lista`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            // Convierte la respuesta en un JSON
            return response.json();
        })
        .then(datos => {
            // Llama a la función para cargar los datos en la tabla
            cargarDatosEnTabla(datos);
            //renderRoles(datos);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            // Muestra un error en el DOM si falla
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}
document.addEventListener('DOMContentLoaded', renderRoles);


// <tr>
// <td class="role">Administrador</td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// </tr>
// <tr>
// <td class="role">Docente</td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// </tr>
// <tr>
// <td class="role">Estudiante</td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// <td><input type="checkbox" checked></td>
// </tr>

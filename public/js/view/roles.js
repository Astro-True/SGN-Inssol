// function renderRoles() {
//     const container = $("#view-container");
//     container.empty();
//     const tablaHTML = `
//                 <div class=content-agregar>
//         <div class="Add-Update" data-view="Usuario" id=btn-Actualizar>Actualizar</div>
//         </div>
//         <table id="datos-tabla">
//         <thead>
//             <tr>
//                 <th rowspan="2" class="header">Rol</th>
//                 <th colspan="6" class="header">Acceso A:</th>
//             </tr>
//             <tr>
//                 <th>Usuario</th>
//                 <th>Docente</th>
//                 <th>Roles</th>
//                 <th>Cursos</th>
//                 <th>Horario</th>
//                 <th>Grado</th>
//             </tr>

//         </thead>
//             <tbody>
//             </tbody>
//         </table>
//     `;
//     container.append(tablaHTML);
//     // Evento para el botón "Actualizar", recarga la vista actual de usuarios
//     document.getElementById('btn-Actualizar').addEventListener('click', function () {
//         // Llama de nuevo a la función para refrescar la vista
//         renderRoles();
//     });
//     obtenerDatos();
// }

// // Función para cargar los datos de usuarios en la tabla
// function cargarDatosEnTabla(datos) {
//     // Selecciona el cuerpo de la tabla
//     const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
//     // Ordena los usuarios por nombre
//     datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
//     // Limpia la tabla antes de agregar los nuevos datos
//     tabla.innerHTML = '';
//     // Itera sobre los datos de los usuarios
//     datos.forEach(dato => {
//         // Inserta una nueva fila en la tabla
//         let fila = tabla.insertRow();

//         // Añade la celda con el nombre del rol y le aplica la clase "role"
//         let celdaRol = fila.insertCell(0);
//         celdaRol.textContent = dato.nombre;  // Asigna el texto (nombre del rol)
//         celdaRol.className = 'role';         // Asigna la clase "role"
//         fila.insertCell(1).innerHTML = `<input type="checkbox" ${dato.usuario ? 'checked' : ''} data-id="${dato.id}" data-field="Usuario">`;
//         fila.insertCell(2).innerHTML = `<input type="checkbox" ${dato.docente ? 'checked' : ''} data-id="${dato.id}" data-field="Docente">`;
//         fila.insertCell(3).innerHTML = `<input type="checkbox" ${dato.roles ? 'checked' : ''} data-id="${dato.id}" data-field="Roles">`;
//         fila.insertCell(4).innerHTML = `<input type="checkbox" ${dato.cursos ? 'checked' : ''} data-id="${dato.id}" data-field="Cursos">`;
//         fila.insertCell(5).innerHTML = `<input type="checkbox" ${dato.horarios ? 'checked' : ''} data-id="${dato.id}" data-field="Horarios">`;
//         fila.insertCell(6).innerHTML = `<input type="checkbox" ${dato.grados ? 'checked' : ''} data-id="${dato.id}" data-field="Grados">`;
//     });

//     // Añadir evento a los checkboxes
//     document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
//         checkbox.addEventListener('change', (event) => {
//             const id = event.target.getAttribute('data-id');
//             const field = event.target.getAttribute('data-field');
//             const value = event.target.checked;

//             actualizarAcceso(id, field, value);
//         });
//     });
// }

// // Función para actualizar el estado de acceso en el backend
// function actualizarAcceso(id, field, value) {
//     const url = `${URL_SERVER}/Roles/actualizar`;
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ id, field, value })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al actualizar el acceso');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Actualización exitosa:', data);
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la actualización:', error);
//         });
// }

// // Función para obtener los datos desde el servidor
// function obtenerDatos() {
//     // URL del servidor donde se obtienen los datos
//     const url = `${URL_SERVER}/Roles/lista`;
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al obtener los datos');
//             }
//             // Convierte la respuesta en un JSON
//             return response.json();
//         })
//         .then(datos => {
//             // Llama a la función para cargar los datos en la tabla
//             cargarDatosEnTabla(datos);
//             //renderRoles(datos);
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la solicitud:', error);
//             // Muestra un error en el DOM si falla
//             document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
//         });
// }
// document.addEventListener('DOMContentLoaded', renderRoles);
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
        alert('Error al actualizar el acceso. Por favor, inténtelo de nuevo.'); // Notificación al usuario
    });
}

function obtenerDatos() {
    const url = `${URL_SERVER}/Roles/lista`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(datos => {
            cargarDatosEnTabla(datos);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            $('#view-container').html('<p>Error al cargar los datos.</p>');
        });
}


$(document).ready(renderRoles);

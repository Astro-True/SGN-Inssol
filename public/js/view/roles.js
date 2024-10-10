function renderRoles() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
        <table id="datos-tabla">
        <thead>
            <tr>
                <th rowspan="2" class="header">Rol</th>
                <th colspan="3" class="header">Acceso A:</th>
            </tr>
            <tr>
                <th>usuario</th>
                <th>Roles</th>
                <th>Cursos</th>
            </tr>
            <tr>
                <td class="role">Administrador</td>
                <td><input type="checkbox" checked></td>
                <td><input type="checkbox" checked></td>
                <td><input type="checkbox" checked></td>
            </tr>
            <tr>
                <td class="role">Docente</td>
                <td><input type="checkbox" checked></td>
                <td><input type="checkbox" checked></td>
                <td><input type="checkbox" checked></td>
            </tr>
            <tr>
                <td class="role">Estudiante</td>
                <td><input type="checkbox" checked></td>
                <td><input type="checkbox" checked></td>
                <td><input type="checkbox" checked></td>
            </tr>
        </thead>
        <tbody>
            </tbody>
        </table>
    `;
    container.append(tablaHTML);
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
        // Añade la celda con el nombre del usuario, ci, telefono, correo domicilio
        fila.insertCell(0).textContent = dato.Nombre_Rol;
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
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            // Muestra un error en el DOM si falla
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}
document.addEventListener('DOMContentLoaded', renderRoles);
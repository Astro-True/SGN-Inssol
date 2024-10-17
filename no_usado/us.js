// Archivo us.js

// URL para obtener datos
const apiUrl = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';

// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) {
    const tabla = document.getElementById('datos-tabla')?.getElementsByTagName('tbody')[0];
    if (!tabla) {
        console.error('Elemento de tabla no encontrado.');
        return;
    }
    // Ordenar los datos por el campo 'nombre' alfabéticamente
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Vaciar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();

        let celdaNombre = fila.insertCell(0);
        let celdaCI = fila.insertCell(1);
        let celdaTelefono = fila.insertCell(2);
        let celdaCorreo = fila.insertCell(3);
        let celdaFechaNacimiento = fila.insertCell(4);
        let celdaDomicilio = fila.insertCell(5);

        celdaNombre.textContent = dato.nombre || 'N/A';
        celdaCI.textContent = dato.ci;
        celdaTelefono.textContent = dato.telefono;
        celdaCorreo.textContent = dato.correo;
        celdaFechaNacimiento.textContent = new Date(dato.fechanacimiento).toLocaleDateString();
        celdaDomicilio.textContent = dato.domicilio;
    });
}

// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    mostrarCargando();
    fetch(apiUrl)
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
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}

// Función para mostrar un mensaje de carga
function mostrarCargando() {
    const tabla = document.getElementById('datos-tabla')?.getElementsByTagName('tbody')[0];
    if (tabla) {
        tabla.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
    }
}

// Cargar los datos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', obtenerDatos);

// Función para cargar la vista correspondiente usando jQuery
$(document).ready(function () {
    function cargarVista(view) {
        // Usa una variable diferente para evitar conflictos
        let vistaUrl = 'views/' + view + '.html';

        $('#view-container').load(vistaUrl, function (response, status) {
            if (status === "error") {
                console.warn('Vista no encontrada en la carpeta views/, buscando en el directorio raíz.');
                $('#view-container').load(view + '.html', function (response, status) {
                    if (status === "error") {
                        console.error('Vista no encontrada en el directorio raíz.');
                        $('#view-container').html('<h2>Error: Vista no encontrada</h2>');
                    }
                });
            }
        });
    }

    // Manejador de clic en los botones
    $('.myButton').click(function () {
        var view = $(this).data('view');
        cargarVista(view);
    });

    // Cargar vista por defecto (Inicio)
    cargarVista('usuario');
});

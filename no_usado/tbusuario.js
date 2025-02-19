/*
// const url = "http://192.168.1.41/Usuario";
const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';

// Función para cargar los datos en la tabla
function cargarDatosEnTabla() {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];

    datos.forEach(dato => {
        let fila = tabla.insertRow();
        
        let celdaNombre = fila.insertCell(0);
        let celdaCI = fila.insertCell(1);
        let celdaTelefono = fila.insertCell(2);
        let celdaCorreo = fila.insertCell(3);
        let celdaFechaNacimiento = fila.insertCell(4);
        let celdaDomicilio = fila.insertCell(5);

        celdaNombre.textContent = dato.nombre;
        celdaCI.textContent = dato.contrasenia;
        celdaTelefono.textContent = dato.createdAt;
        celdaCorreo.textContent = dato.correo;
        celdaFechaNacimiento.textContent = dato.fechaNacimiento;
        celdaDomicilio.textContent = dato.domicilio;
    });
}
// Función para obtener los datos desde el host remoto
function obtenerDatos() {
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
        });
}
document.addEventListener('DOMContentLoaded', cargarDatosEnTabla);
*/
/*
url desde la cual obtener los datos
url desde la cual obtener los datos
const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';

// Función para cargar los datos
async function cargarDatos() {
    try {
        const response = await fetch(url);
        const datos = await response.json(); // Convertir la respuesta a JSON

        const tbody = document.querySelector('#datos-tabla tbody');

        datos.forEach(dato => {
            const fila = document.createElement('tr');

            // Insertar las propiedades que deseas mostrar en la tabla
            fila.innerHTML = `
            <td>${persona.nombre}</td>
            <td>${persona.ci}</td>
            <td>${persona.telefono}</td>
            <td>${persona.correo}</td>
            <td>${new Date(persona.fechanacimiento).toLocaleDateString()}</td>
            <td>${persona.domicilio}</td>
        `;

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Cargar los datos al cargar la página
window.onload = cargarDatos;
*/

const url = 'https://66d901d94ad2f6b8ed533858.mockapi.io/datos';

// Función para cargar los datos en la tabla
function cargarDatosEnTabla(datos) { // Asegúrate de recibir 'datos' como parámetro
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
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
        celdaFechaNacimiento.textContent = new Date(dato.fechanacimiento).toLocaleDateString(); // Convertir a formato de fecha legible
        celdaDomicilio.textContent = dato.domicilio;
    });
}

// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(datos => {
            cargarDatosEnTabla(datos); // Pasar los datos obtenidos a la función cargarDatosEnTabla
        })
        // .catch(error => {
        //     console.error('Hubo un problema con la solicitud:', error);
        // });
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
        
}
function mostrarCargando() {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
}

// Cargar los datos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', obtenerDatos); // Llama a obtenerDatos en lugar de cargarDatosEnTabla

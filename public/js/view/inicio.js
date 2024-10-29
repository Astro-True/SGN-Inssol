function renderInicio() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
    <div class=content-agregar>
    <div class="Add-Update" data-view="Usuario" id=btn-Actualizar>Actualizar</div>
    <div class="Add-Update" data-view="Usuario/Agregar" id=btn-agregar>Añadir</div>
    </div>
            <table id="datos-tabla">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Actualización</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="content"></div>
        `;
    container.append(tablaHTML);
    document.querySelectorAll('.myButton').forEach(button => {
        button.addEventListener('click', function () {
            const ruta = button.getAttribute('data-view');
            window.location.hash = ruta; // Cambiar la ruta en el hash
        });
    });
    // Evento para el botón "Actualizar", recarga la vista actual de usuarios
    document.getElementById('btn-Actualizar').addEventListener('click', function () {
        // Llama de nuevo a la función para refrescar la vista
        renderUsuario();
    });
    // Evento para el botón "Añadir", cambia la URL para la vista de agregar usuario
    document.getElementById('btn-agregar').addEventListener('click', function () {
        // Obtiene la vista desde el atributo data-view
        const ruta = this.getAttribute('data-view');
        // Cambia la ruta del hash en la URL
        window.location.hash = ruta;
    });
    obtenerDatos();
}
function cargarDatosEnTabla(datos) {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = dato.id || 'N/A';
        fila.insertCell(1).textContent = dato.nombre || 'N/A';
        fila.insertCell(2).textContent = new Date(dato.createdAt).toLocaleDateString();
        fila.insertCell(3).textContent = new Date(dato.updatedAt).toLocaleDateString();
        let celdaAcciones = fila.insertCell(4);
        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.onclick = function () {
            // Redirige a la vista de edición del usuario con su ID
            window.location.hash = `/Usuario/Editar/?idUsuario=${dato.id}`;
        };
        // Botón de eliminar
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.onclick = function () {
            // Confirmación para eliminar al usuario
            if (confirm(`¿Estás seguro de que quieres eliminar a ${dato.nombre}?`)) {
                const url = `${URL_SERVER}/Usuario/eliminar/${dato.id}`;
                const token = cookieManager.getDecryptedCookie(TOKEN);
                $.ajax({
                    url: url,
                    type: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    success: function(result) {
                        alert('Usuario eliminado correctamente');
                        // Recarga los datos de la tabla después de eliminar
                        obtenerDatos();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Hubo un problema al eliminar el usuario:', textStatus, errorThrown);
                        alert('Error al eliminar el usuario');
                    }
                });
            }
            
        };
        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
    });
}
function obtenerDatos() {
    // URL del servidor donde se obtienen los datos
    const url = `${URL_SERVER}/Usuario/lista`;

    // Obtener el token de la cookie
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
function mostrarCargando() {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
}
function configurarFormulario() {
    // Mostrar el formulario cuando se hace clic en "Añadir"
    document.getElementById("form-container").style.display = "block";
    document.getElementById("view-container").style.display = "none";
    // Ocultar el formulario cuando se hace clic en "Cancelar"
    document.getElementById("cancelar").addEventListener("click", function () {
        document.getElementById("form-container").style.display = "none";
        document.getElementById("view-container").style.display = "block";
    });
    // Manejar el envío del formulario
    document.getElementById("add-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
        // Convertir el formulario a un objeto
        formData.forEach((value, key) => {
            data[key] = value;
        });
        fetch(`${URL_SERVER}/Usuario/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                alert('Usuario agregado exitosamente');
                document.getElementById("form-container").style.display = "none";
                document.getElementById("add-form").reset();
                obtenerDatos(); // Volver a cargar los datos
                document.getElementById("view-container").style.display = "block";
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al agregar el usuario');
            });
        document.getElementById("view-container").style.display = "block";
    });
}
document.addEventListener('DOMContentLoaded', renderInicio);

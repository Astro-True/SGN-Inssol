function renderUsuario() {
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
                <th>Nombre</th>
                <th>CI</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Fecha de Nacimiento</th>
                <th>Domicilio</th>
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
        // Añadir evento al botón de "Actualizar"
        document.getElementById('btn-Actualizar').addEventListener('click', function() {
            // Refresca la vista del usuario
            renderUsuario(); 
        });
    
        // Añadir evento al botón de "Añadir"
        document.getElementById('btn-agregar').addEventListener('click', function() {
            const ruta = this.getAttribute('data-view');
            window.location.hash = ruta;
        });
    
        obtenerDatos();
    // Configurar el botón "Añadir"
    // document.getElementById("bt-anadir").addEventListener("click", function () {
    //     configurarFormulario(); // Mostrar el formulario de agregar
    // });
    obtenerDatos();
}
function cargarDatosEnTabla(datos) {
    const tabla = document.getElementById('datos-tabla').getElementsByTagName('tbody')[0];
    datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    tabla.innerHTML = '';
    datos.forEach(dato => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = dato.nombre || 'N/A';
        fila.insertCell(1).textContent = dato.DatosPersonale.ci;
        fila.insertCell(2).textContent = dato.DatosPersonale.telefono;
        fila.insertCell(3).textContent = dato.DatosPersonale.Correo;
        fila.insertCell(4).textContent = new Date(dato.DatosPersonale.FechaNacimiento).toLocaleDateString();
        fila.insertCell(5).textContent = dato.DatosPersonale.Domicilio;
        // fila.insertCell(0).textContent = dato.nombre || 'N/A';
        // fila.insertCell(1).textContent = dato.ci;
        // fila.insertCell(2).textContent = dato.telefono;
        // fila.insertCell(3).textContent = dato.Correo;
        // fila.insertCell(4).textContent = new Date(dato.FechaNacimiento).toLocaleDateString();
        // fila.insertCell(5).textContent = dato.Domicilio;
        let celdaAcciones = fila.insertCell(6);
        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.onclick = function () {
            window.location.hash = '/Usuario/Editar';
        };
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.onclick = function () {
            if (confirm(`¿Estás seguro de que quieres eliminar a ${dato.nombre}?`)) {
                fetch(`${URL_SERVER}/Usuario/eliminar/${dato.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el usuario');
                    }
                    return response.json();
                })
                .then(result => {
                    alert('Usuario eliminado correctamente');
                    obtenerDatos(); // Volver a cargar los datos en la tabla después de eliminar
                })
                .catch(error => {
                    console.error('Hubo un problema al eliminar el usuario:', error);
                    alert('Error al eliminar el usuario');
                });
            }
        };
        
        // let btnAñadir = document.createElement('button');
        // btnAñadir.textContent = 'Añadir';
        // btnAñadir.id = 'btn-añadir';
        // btnAñadir.onclick = function () {
        //     configurarFormulario();
        // };
        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
        // celdaAcciones.appendChild(btnAñadir);
    });
}
// Función para obtener los datos desde el host remoto
function obtenerDatos() {
    const url = `${URL_SERVER}/Usuario/lista`;
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
            document.getElementById('view-container').innerHTML = '<p>Error al cargar los datos.</p>';
        });
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
function configurarFormularioActualizar(dato) {
    document.getElementById("form-container").style.display = "block";
    document.getElementById("view-container").style.display = "none";
    document.getElementById("nombre").value = dato.nombre;
    document.getElementById("ci").value = dato.DatosPersonale.ci;
    document.getElementById("telefono").value = dato.DatosPersonale.telefono;
    document.getElementById("correo").value = dato.DatosPersonale.Correo;
    document.getElementById("fechanacimiento").value = dato.DatosPersonale.FechaNacimiento;
    document.getElementById("domicilio").value = dato.DatosPersonale.Domicilio;
    document.getElementById("gradoacademico").value = dato.DatosAcademico.GradoAcademico;
    document.getElementById("areaespecializacion").value = dato.DatosAcademico.AreaEspecializacion;
    document.getElementById("grado").value = dato.DatosAcademico.Grado;
    document.getElementById("add-form").onsubmit = function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        fetch(`${URL_SERVER}/Usuario/actualizar/${dato.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                alert('Usuario actualizado exitosamente');
                document.getElementById("form-container").style.display = "none";
                document.getElementById("add-form").reset();
                obtenerDatos(); // Volver a cargar los datos
                document.getElementById("view-container").style.display = "block";
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al actualizar el usuario');
            });
    };
}


document.addEventListener('DOMContentLoaded', renderUsuario);

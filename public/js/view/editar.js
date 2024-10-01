function renderEditar() {
    const container = $("#view-container");
    container.empty();
    const formHTML = `
        <div id="form-container">
            <h2>Editar Usuario</h2>
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
                    <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" name="fechanacimiento" required>
                </div>
                <div class="form-group">
                    <label for="domicilio">Domicilio:</label>
                    <input type="text" id="domicilio" name="domicilio" required>
                </div>
                <div class="form-group">
                    <label for="gradoacademico">GradoAcademico:</label>
                    <input type="text" id="gradoacademico" name="gradoacademico" required>
                </div>
                <div class="form-group">
                    <label for="areaespecializacion">AreaEspecializacion:</label>
                    <input type="text" id="areaespecializacion" name="areaespecializacion" required>
                </div>
                <div class="form-group">
                    <label for="grado">Grado:</label>
                    <input type="text" id="grado" name="grado" required>
                </div>
                <div class="btn-form">
                    <button type="submit" id=enviar-form>Enviar</button>
                    <button type="button" id="cancelar-form">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    container.append(formHTML);
    configurarFormularioActualizar();
}

function configurarFormulario() {
    // Mostrar el formulario y manejar el evento de "Cancelar"
    document.getElementById("form-container").style.display = "block";
    document.getElementById("cancelar-form").addEventListener("click", function () {
        window.location.hash = '/usuario';
        rutas();
    });
    // Manejar el envío del formulario
    document.getElementById("add-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
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
            // .then(response => response.json())
            .then(result => {
                alert('Usuario agregado exitosamente');
                document.getElementById("add-form").reset();
                document.getElementById("view-container").style.display = "block";
                window.location.hash = '/usuario';
                rutas();
                //obtenerDatos(); // Recargar datos

            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al agregar el usuario : catch');
            });
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
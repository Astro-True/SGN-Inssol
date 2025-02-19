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
    $("#btn-Actualizar").on('click', () => {
        obtenerDatos();
    });
    obtenerDatos();
}
function cargarDatosEnTabla(datos) {
    const tabla = $('#datos-tabla tbody');
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
    $('input[type="checkbox"]').change(function (event) {
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
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".myButton, .forgot-password, .User").forEach((button) => {
        if (button) {
            button.addEventListener("click", function (event) {
                if (button.classList.contains("forgot-password")) {
                    event.preventDefault();
                }
                const ruta = button.classList.contains("forgot-password")
                    ? button.getAttribute("href")
                    : button.getAttribute("data-view");
                window.location.hash = ruta;
                rutas();
            });
        }
    });
});
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
function changeStylesheet(cssFile) {
    removeStylesheet("roles.css");
    removeStylesheet("login.css");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./css/${cssFile}`;
    link.type = "text/css";
    document.head.appendChild(link);
}
function removeStylesheet(href) {
    const links = document.querySelectorAll(`link[href*="${href}"]`);
    links.forEach((link) => link.parentNode.removeChild(link));
}
function rutas() {
    let path = window.location.hash.substring(1);
    console.log(path);
    const container = document.getElementById("view-container");
    if (container == "view-container") {
        container.classList.remove("agregar-active");
    }
    document.querySelectorAll(".myButton").forEach((button) => {
        const ruta = button.getAttribute("data-view");
        if (ruta === path) {
            button.classList.add("active");
            container.classList.remove("agregar-active");
        } else {
            button.classList.remove("active");
        }
    });
    if (path === "/inicio") {
        console.log("/inicio");
        changeStylesheet("AreaAdmin.css");
        loadScript("./js/view/inicio.js")
            .then(() => {
                console.log("Script de Inicio cargado");
                if (typeof renderInicio === "function") {
                    removeStylesheet("login.css");
                    renderInicio();
                } else {
                    console.error("La función renderInicio no está definida");
                }
            })
            .catch((err) => {
                console.error("Error al cargar el script de Inicio:", err);
            });
    }
}
window.addEventListener("hashchange", (e) => {
    const currentHash = window.location.hash; // Obtiene el hash actual
    if (currentHash === "#/User" || currentHash === "#/recuperar" || currentHash === "#/confirmar") {
        localStorage.setItem('wasUserHash', 'true'); // Establece un valor en localStorage
    } else {
        if (localStorage.getItem('wasUserHash') === 'true') {
            localStorage.removeItem('wasUserHash'); // Elimina el valor de localStorage
            window.location.reload(); // Recarga la página
        }
    }
    rutas(e);
});
$(document).ready(() => {
    rutas("");
});
const { sequelize } = require("../modelos/conexion"); // Asegúrate de importar tu instancia de Sequelize correctamente

async function rolesLista(req, res) {
    try {
        const [roles] = await sequelize.query(`
      SELECT
        r.id,
        r."Nombre_Rol",
        r."createdAt",
        r."updatedAt",
        r."Usuario",
        r."Docente",
        r."Roles",
        r."Cursos",
        r."Horarios",
        r."Grados"
      FROM "Roles" r;
    `);
        const RolesEstructurados = roles.map((rol) => ({
            id: rol.id,
            nombre: rol.Nombre_Rol,
            usuario: rol.Usuario,  // Incluye estos campos en la respuesta
            docente: rol.Docente,
            roles: rol.Roles,
            cursos: rol.Cursos,
            horarios: rol.Horarios,
            grados: rol.Grados,
            createdAt: rol.createdAt ? new Date(rol.createdAt).toISOString() : null, // Verifica y formatea createdAt
            updatedAt: rol.updatedAt ? new Date(rol.updatedAt).toISOString() : null, // Verifica y formatea updatedAt
        }));
        console.log(RolesEstructurados);
        res.send(RolesEstructurados);
    } catch (error) {
        console.error("Error al obtener la lista de Roles:", error);
        res.status(500).send({ message: "Error al obtener la lista de Roles" });
    }
}
async function rolesUpdate(req, res) {
    try {
        const { id, field, value } = req.body;
        // Asegúrate de que 'field' sea un campo permitido
        const allowedFields = ['Usuario', 'Docente', 'Roles', 'Cursos', 'Horarios', 'Grados'];
        if (!id || !field || !allowedFields.includes(field)) {
            return res.status(400).send({ message: "Faltan datos requeridos o campo no permitido" });
        }
        // Actualiza el campo específico para el rol correspondiente
        await sequelize.query(
            `UPDATE "Roles" SET "${field}" = ? WHERE id = ?`,
            { replacements: [value, id] }
        );
        res.send({ message: "Acceso actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el acceso:", error);
        res.status(500).send({ message: "Error al actualizar el acceso" });
    }
}
module.exports = { rolesLista, rolesUpdate };
const express = require("express");
const router = express.Router();

const {
  rolesLista,
  rolesUpdate,
} = require("../controladores/Roles-controles");

router.get(`/lista`, rolesLista);
router.post("/actualizar", rolesUpdate);

module.exports = router;

function renderRoles() {
    const container = $("#view-container");
    container.empty();
    const tablaHTML = `
        <table>
            <tr>
                <th rowspan="2" class="header">Rol</th>
                <th colspan="3" class="header">Acceso A:</th>
            </tr>
            <tr>
                <th>Usuario</th>
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
        </table>
    `;
    container.append(tablaHTML);
}

document.addEventListener('DOMContentLoaded', renderRoles);
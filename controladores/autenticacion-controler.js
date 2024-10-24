const { Json } = require('sequelize/lib/utils');
const { sequelize, Usuario, Roles } = require('./../modelos/conexion');
const jwt = require('jsonwebtoken');
async function iniciarSesion(req, res) {
    const body = req.body;

    try {
        // Imprimir las credenciales recibidas
        console.log('Credenciales recibidas:', body);

        const results = await sequelize.query(
            // `SELECT id, nombre FROM "Usuarios" WHERE nombre = :nombre AND contrasenia = :contrasenia`,
            `SELECT u.id, u.nombre, r."Nombre_Rol" FROM "Usuarios" u 
            JOIN "Roles" r ON u."RoleId" = r.id 
            WHERE u.nombre = :nombre AND u.contrasenia = :contrasenia`,
            {
                replacements: { nombre: body.nombre, contrasenia: body.contrasenia },
                type: sequelize.QueryTypes.SELECT
            }
        );

        // Imprimir el resultado de la consulta
        console.log('Resultados de la consulta:', results);

        // Verifica si el resultado tiene datos
        if (!results || results.length === 0) {
            return res.status(401).send({ message: "Usuario no permitido" });
        }

        // Cambiar la forma en que accedes a los resultados
        const user = results[0]; // Aquí es donde estaba el problema, ya que results es un objeto.
        req.session['user']= JSON.stringify(user)
        const token = jwt.sign({ id:user.id, nombre:user.nombre, rol:user.Nombre_Rol }, 'shhhhh');
        console.log(token);
        res.send({
            message: 'Éxito',
            data: {
                token: token
            }
        });
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        res.status(500).send({ message: "Error en el servidor", error: error.message });
    }
}

async function datos(req, res) {

    try {
        const [userData] = await sequelize.query(
            `SELECT u.id, u.nombre, dp.ci, dp.telefono, dp."Correo", dp."FechaNacimiento", dp."Domicilio", da."GradoAcademico", da."AreaEspecializacion", da."Grado"
            FROM "Usuarios" u
            LEFT JOIN "DatosPersonales" dp ON u.id = dp."UsuarioId"
            LEFT JOIN "DatosAcademicos" da ON u.id = da."UsuarioId"
            WHERE u.id = :id`,
            {
                replacements: { id: req.user.id },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!userData) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send({
            data: {
                id: userData.id,
                nombre: userData.nombre,
                DatosPersonales: {
                    ci: userData.ci,
                    telefono: userData.telefono,
                    Correo: userData.Correo,
                    FechaNacimiento: userData.FechaNacimiento,
                    Domicilio: userData.Domicilio
                },
                DatosAcademicos: {
                    GradoAcademico: userData.GradoAcademico,
                    AreaEspecializacion: userData.AreaEspecializacion,
                    Grado: userData.Grado
                }
            }
        });
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).send({ message: "Error al obtener los datos del usuario", error: error.message });
    }
}

module.exports = { iniciarSesion, datos };
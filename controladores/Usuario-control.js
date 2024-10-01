const router = require("../rutas/Usuario-rutas")
const { Usuario, DatosPersonales, DatosAcademicos } = require("./../modelos/conexion")
async function usuariosLista(req, res) {
    const usuario = await Usuario.findAll({
        include: [
            {
                model: DatosPersonales,
                attributes: ["ci", "telefono", "Correo", "FechaNacimiento", "Domicilio"]
            },
            {
                model: DatosAcademicos,
                attributes: ["GradoAcademico", "AreaEspecializacion", "Grado"]
            }
        ]
    })
    console.log(usuario)
    res.send(usuario)
}
async function usuarioCreate(req, res) {
    console.log(req.body)
    const usuario = await Usuario.create({ nombre: req.body.nombre, contrasenia: req.body.contrasenia })
    const datospersonales = await DatosPersonales.create({ ci: req.body.ci, telefono: req.body.telefono, Correo: req.body.correo, FechaNacimiento: req.body.fechanacimiento, Domicilio: req.body.domicilio, UsuarioId: usuario.id })
    const datosacademicos = await DatosAcademicos.create({ GradoAcademico: req.body.gradoacademico, AreaEspecializacion: req.body.areaespecializacion, Grado: req.body.grado, UsuarioId: usuario.id })
    res.send("alegria")
}
// async function actualizarUsuario(req, res) {
//     const body = req.body
//     const idParams = req - params.id
//     const [actualizarUsuario] = await Usuario.update({
//         firstName: body.firstName,
//         lastName: body.lastName,
//         password: body.password,
//         ci: body.ci
//     })
// }
async function actualizarUsuario(req, res) {
    try {
        const idParams = req.params.id; // Obtener el ID del usuario desde los parámetros de la URL
        const body = req.body; // Obtener los nuevos datos del cuerpo de la solicitud

        const usuario = await Usuario.findByPk(idParams); // Buscar el usuario por ID

        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        await Usuario.update(
            {
                nombre: body.nombre,
                contrasenia: body.contrasenia
            },
            { where: { id: idParams } }
        );
        await DatosPersonales.update(
            {
                ci: body.ci,
                telefono: body.telefono,
                Correo: body.correo,
                FechaNacimiento: body.fechanacimiento,
                Domicilio: body.domicilio
            },
            { where: { UsuarioId: idParams } }
        );
        await DatosAcademicos.update(
            {
                GradoAcademico: body.gradoacademico,
                AreaEspecializacion: body.areaespecializacion,
                Grado: body.grado
            },
            { where: { UsuarioId: idParams } }
        );

        res.send({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar el usuario" });
    }
}
async function eliminarUsuario(req, res) {
    try {
        const idParams = req.params.id; // Obtener el ID desde los parámetros
        const usuario = await Usuario.findByPk(idParams); // Buscar el usuario por ID

        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        // Eliminar el usuario y los datos relacionados
        await DatosPersonales.destroy({ where: { UsuarioId: idParams } });
        await DatosAcademicos.destroy({ where: { UsuarioId: idParams } });
        await Usuario.destroy({ where: { id: idParams } });

        res.send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al eliminar el usuario" });
    }
}


module.exports = { usuariosLista, usuarioCreate, actualizarUsuario, eliminarUsuario, Usuario }
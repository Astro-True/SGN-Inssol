const router = require("../rutas/Usuario-rutas");
const { sequelize } = require("../modelos/conexion"); // Asegúrate de importar sequelize para ejecutar las consultas raw.

// Obtener lista de usuarios
async function usuariosLista(req, res) {
  try {
    const [usuarios] = await sequelize.query(`
    SELECT
      u.id,
      u.nombre,
      u."createdAt",
      u."updatedAt",
      u."RoleId",
      r."Nombre_Rol",
      dp.ci, 
      dp.telefono, 
      dp."Correo", 
      dp."FechaNacimiento", 
      dp."Domicilio",
      da."GradoAcademico", 
      da."AreaEspecializacion", 
      da."Grado"
    FROM "Usuarios" u
    LEFT JOIN "DatosPersonales" dp ON u.id = dp."UsuarioId"
    LEFT JOIN "DatosAcademicos" da ON u.id = da."UsuarioId"
    LEFT JOIN "Roles" r ON u."RoleId"= r."id";

        `);
    const usuariosEstructurados = usuarios.map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      contrasenia: usuario.contrasenia,
       createdAt: usuario.createdAt ? new Date(usuario.createdAt).toISOString() : null, // Verifica y formatea createdAt
       updatedAt: usuario.updatedAt ? new Date(usuario.updatedAt).toISOString() : null, // Verifica y formatea updatedAt
      roleid: usuario.RoleId,
      Roles: {
        Nombre_Rol: usuario.Nombre_Rol,
      },
      DatosPersonale: {
        ci: usuario.ci,
        telefono: usuario.telefono,
        Correo: usuario.Correo,
        FechaNacimiento: usuario.FechaNacimiento,
        Domicilio: usuario.Domicilio,
      },
      DatosAcademico: {
        GradoAcademico: usuario.GradoAcademico,
        AreaEspecializacion: usuario.AreaEspecializacion,
        Grado: usuario.Grado,
      },
      
    }));

    console.log(usuariosEstructurados);
    res.send(usuariosEstructurados);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    res.status(500).send({ message: "Error al obtener la lista de usuarios" });
  }
}

// Crear un nuevo usuario
async function usuarioCreate(req, res) {
  try {
    const {
      nombre,
      contrasenia,
      ci,
      telefono,
      correo,
      fechanacimiento,
      domicilio,
      gradoacademico,
      areaespecializacion,
      grado,
      roleid,
    } = req.body;

    // Transacción para garantizar que los tres inserts se realicen correctamente
    await sequelize.transaction(async (t) => {
      const [usuario] = await sequelize.query(
        `INSERT INTO "Usuarios" (nombre, contrasenia, "RoleId", "createdAt", "updatedAt") VALUES (?, ?, ?, now(),now()) RETURNING id`,
        { replacements: [nombre, contrasenia,roleid], transaction: t }
      );
      const usuarioId = usuario[0].id;

      await sequelize.query(
        `INSERT INTO "DatosPersonales" (ci, telefono, "Correo", "FechaNacimiento", "Domicilio", "UsuarioId","createdAt", "updatedAt") 
                VALUES (?, ?, ?, ?, ?, ?,now(),now())`,
        {
          replacements: [
            ci,
            telefono,
            correo,
            fechanacimiento,
            domicilio,
            usuarioId,
          ],
          transaction: t,
        }
      );
      await sequelize.query(
        `INSERT INTO "DatosAcademicos" ("GradoAcademico", "AreaEspecializacion", "Grado", "UsuarioId","createdAt", "updatedAt") 
                VALUES (?, ?, ?, ?,now(),now())`,
        {
          replacements: [gradoacademico, areaespecializacion, grado, usuarioId],
          transaction: t,
        }
      );
    });

    res.send("Usuario creado con éxito");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al crear el usuario" });
  }
}

// Actualizar un usuario
async function actualizarUsuario(req, res) {
  try {
    const idParams = req.params.id;
    const {
      nombre,
      contrasenia,
      ci,
      telefono,
      correo,
      fechanacimiento,
      domicilio,
      gradoacademico,
      areaespecializacion,
      grado,
    } = req.body;

    // Transacción para garantizar que todas las actualizaciones se realicen correctamente
    await sequelize.transaction(async (t) => {
      await sequelize.query(
        `UPDATE "Usuarios" SET nombre = ?, contrasenia = ? WHERE id = ?`,
        { replacements: [nombre, contrasenia, idParams], transaction: t }
      );
      await sequelize.query(
        `UPDATE "DatosPersonales" SET ci = ?, telefono = ?, "Correo" = ?, "FechaNacimiento" = ?, "Domicilio" = ? 
                WHERE "UsuarioId" = ?`,
        {
          replacements: [
            ci,
            telefono,
            correo,
            fechanacimiento,
            domicilio,
            idParams,
          ],
          transaction: t,
        }
      );
      await sequelize.query(
        `UPDATE "DatosAcademicos" SET "GradoAcademico" = ?, "AreaEspecializacion" = ?, "Grado" = ? 
                WHERE "UsuarioId" = ?`,
        {
          replacements: [gradoacademico, areaespecializacion, grado, idParams],
          transaction: t,
        }
      );
    });

    res.send({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al actualizar el usuario" });
  }
}
// Obtener un usuario específico
async function usuarioDetalle(req, res) {
  const usuarioId = req.params.id;
  try {
    const [usuario] = await sequelize.query(`
      SELECT
          u.id,
          u.nombre,
          u.contrasenia,
          dp.ci, 
          dp.telefono, 
          dp."Correo", 
          dp."FechaNacimiento", 
          dp."Domicilio",
          da."GradoAcademico", 
          da."AreaEspecializacion", 
          da."Grado"
      FROM "Usuarios" u
      LEFT JOIN "DatosPersonales" dp ON u.id = dp."UsuarioId"
      LEFT JOIN "DatosAcademicos" da ON u.id = da."UsuarioId"
      WHERE u.id = ?;
      `, {
      replacements: [usuarioId]
    });

    if (usuario.length > 0) {
      const usuarioEstructurado = {
        id: usuario[0].id,
        nombre: usuario[0].nombre,
        contrasenia: usuario[0].contrasenia,
        DatosPersonale: {
          ci: usuario[0].ci,
          telefono: usuario[0].telefono,
          Correo: usuario[0].Correo,
          FechaNacimiento: usuario[0].FechaNacimiento,
          Domicilio: usuario[0].Domicilio
        },
        DatosAcademico: {
          GradoAcademico: usuario[0].GradoAcademico,
          AreaEspecializacion: usuario[0].AreaEspecializacion,
          Grado: usuario[0].Grado
        }
      };
      res.send(usuarioEstructurado);
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles del usuario:", error);
    res.status(500).send({ message: "Error al obtener los detalles del usuario" });
  }
}


// Eliminar un usuario
async function eliminarUsuario(req, res) {
  try {
    const idParams = req.params.id;

    // Transacción para garantizar que todas las eliminaciones se realicen correctamente
    await sequelize.transaction(async (t) => {
      await sequelize.query(
        `DELETE FROM "DatosPersonales" WHERE "UsuarioId" = ?`,
        {
          replacements: [idParams],
          transaction: t,
        }
      );
      await sequelize.query(
        `DELETE FROM "DatosAcademicos" WHERE "UsuarioId" = ?`,
        {
          replacements: [idParams],
          transaction: t,
        }
      );
      await sequelize.query(`DELETE FROM "Usuarios" WHERE id = ?`, {
        replacements: [idParams],
        transaction: t,
      });
    });

    res.send({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar el usuario" });
  }
}

module.exports = {
  usuariosLista,
  usuarioCreate,
  actualizarUsuario,
  usuarioDetalle,
  eliminarUsuario,
};

[
  {
    id: 2,
    nombre: "alex",
    ci: "12345",
    telefono: 123456,
    Correo: "example@gmail.com",
    FechaNacimiento: "2024-09-16",
    Domicilio: "cliza",
    GradoAcademico: "area",
    AreaEspecializacion: "area1",
    Grado: "segundo",
  },
];

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

// async function rolesUpdate(req, res) {
//   try {
//     const { id, field, value } = req.body;

//     if (!id || !field) {
//       return res.status(400).send({ message: "Faltan datos requeridos" });
//     }

//     // Actualiza el campo específico para el rol correspondiente
//     await sequelize.query(
//       `UPDATE "Roles" SET "${field}" = ? WHERE id = ?`,
//       { replacements: [value, id] }
//     );

//     res.send({ message: "Acceso actualizado correctamente" });
//   } catch (error) {
//     console.error("Error al actualizar el acceso:", error);
//     res.status(500).send({ message: "Error al actualizar el acceso" });
//   }
// }




// // Obtener lista de roles usando una consulta RAW
// async function rolesLista(req, res) {
//   try {
//     const roles = await sequelize.query('SELECT * FROM "Roles"', {
//       type: sequelize.QueryTypes.SELECT
//     });
//     res.send(roles);
//   } catch (error) {
//     console.error('Error al obtener Roles:', error);
//     res.status(500).send('Error al obtener los Roles');
//   }
// }

// Crear un rol usando una consulta RAW
// async function rolesCreate(req, res) {
//   try {
//     const {
//       Nombre_Rol,
//     } = req.body;

//     // Transacción para garantizar que los tres inserts se realicen correctamente
//     await sequelize.transaction(async (t) => {
//       const [roles] = await sequelize.query(
//         `INSERT INTO "Roles" (Nombre_Rol,"createdAt", "updatedAt") VALUES (?, ?,now(),now()) RETURNING id`,
//         { replacements: [Nombre_Rol], transaction: t }
//       );
//     });
//     res.send("Rol creado con éxito");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error al crear el Rol" });
//   }
// }

// async function rolesCreate(req, res) {
//   try {
//     const { Nombre_Rol } = req.body;

//     // Validación básica
//     if (!Nombre_Rol) {
//       return res.status(400).send({ message: "El Nombre_Rol es requerido." });
//     }

//     // Transacción para garantizar que el insert se realice correctamente
//     await sequelize.transaction(async (t) => {
//       const [result] = await sequelize.query(
//         `INSERT INTO "Roles" (Nombre_Rol, "createdAt", "updatedAt") VALUES (?, now(), now()) RETURNING id`,
//         { replacements: [Nombre_Rol], transaction: t }
//       );

//       // Se puede capturar el ID del nuevo rol si es necesario
//       const newRoleId = result[0].id;
//       console.log(`Nuevo rol creado con ID: ${newRoleId}`);
//     });

//     res.send("Rol creado con éxito");
//   } catch (error) {
//     console.error("Error al crear el rol:", error);
//     res.status(500).send({ message: "Error al crear el Rol" });
//   }
// }
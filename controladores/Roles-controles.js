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
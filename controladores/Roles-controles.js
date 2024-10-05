const { sequelize } = require("../modelos/conexion"); // Asegúrate de importar tu instancia de Sequelize correctamente

// Obtener lista de roles usando una consulta RAW
async function rolesLista(req, res) {
  try {
    const roles = await sequelize.query('SELECT * FROM Roles', {
      type: sequelize.QueryTypes.SELECT
    });
    res.send(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).send('Error al obtener los roles');
  }
}

// Crear un rol usando una consulta RAW
async function rolesCreate(req, res) {
  const { nombre } = req.body; // Obtener el nombre del rol del cuerpo de la solicitud

  try {
    await sequelize.query('INSERT INTO Roles (nombre) VALUES (:nombre)', {
      replacements: { nombre: nombre || 'roles' }, // Reemplazar el valor del nombre
      type: sequelize.QueryTypes.INSERT
    });

    res.send('Rol creado exitosamente');
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).send('Error al crear el rol');
  }
}
module.exports = { rolesLista, rolesCreate };


// const { Roles } = require("express");

// async function rolesLista(req, res) {
//   const roles = await Roles.findAll();
//   res.send(roles);
// }
// async function rolesCreate(req, res) {
//   const Roles = await Roles.Create({ nombre: "roles" });

//   res.send("tristeza");
// }
// module.exports = { rolesLista, rolesCreate };

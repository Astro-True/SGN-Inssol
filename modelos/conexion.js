const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:12345@localhost:5432/InssolBD");
//const sequelize = new Sequelize("postgres://postgres:12345@localhost:5432/ejemplo");
// Sequelize('postgresql://basededatosdelsol_user:SCMg0hfV0FoBuxmRIpz0qfV6OzOCzvOU@dpg-cru1i82j1k6c73e0k7l0-a.virginia-postgres.render.com/basededatosdelsol', {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true, // Requiere SSL
//       rejectUnauthorized: false // Permitir conexiones sin verificar certificados
//     }
//   }
// })
//const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/ejemplo');

const Usuario = sequelize.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const DatosPersonales = sequelize.define("DatosPersonales", {
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const DatosAcademicos = sequelize.define("DatosAcademicos", {
  GradoAcademico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AreaEspecializacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Grado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const HistorialContrasenia = sequelize.define("Historialcontrasenia", {
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Rol_Usuario = sequelize.define("Rol_Usuario", {
  RolesUsuario_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Roles = sequelize.define("Roles", {
  Nombre_Rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Usuario:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Docente:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Roles:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Cursos:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Horarios:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Grados:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});
Usuario.belongsToMany(Roles, { through: "RolUsuario" });
Roles.belongsToMany(Usuario, { through: "RolUsuario" });

Usuario.hasMany(HistorialContrasenia);
HistorialContrasenia.belongsTo(Usuario);

Usuario.hasOne(DatosAcademicos);
DatosAcademicos.belongsTo(Usuario);

Usuario.hasOne(DatosPersonales);
DatosPersonales.belongsTo(Usuario);
async function probarconnexion() {
  try {
    // Autenticación de la base de datos
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");

    // Sincronización de tablas (esto eliminará y recreará las tablas si existen)
    await sequelize.sync({ force: true });
    console.log("Tablas sincronizadas correctamente (si existían, se han eliminado y recreado).");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}
/*
async function probarconnexion() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
*/

module.exports = {
  probarconnexion,
  sequelize,
  Usuario,
  Roles,
  HistorialContrasenia,
  DatosAcademicos,
  DatosPersonales,
};

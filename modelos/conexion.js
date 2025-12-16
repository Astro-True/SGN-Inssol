const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("postgres://postgres:12345@localhost:5432/InssolBD");
const sequelize = new Sequelize("postgres://postgres:12345@localhost:5432/ejemplo");
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
Roles.hasMany(Usuario );
Usuario.hasOne(Roles,);

Usuario.hasMany(HistorialContrasenia);
HistorialContrasenia.belongsTo(Usuario);

Usuario.hasOne(DatosAcademicos);
DatosAcademicos.belongsTo(Usuario);

Usuario.hasOne(DatosPersonales);
DatosPersonales.belongsTo(Usuario);
async function probarconnexion() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
    // Por defecto sincronizamos tablas sin eliminar datos.
    // Para forzar recreación destructiva, exporta FORCE_SYNC=true en el entorno.
    const forceSync = process.env.FORCE_SYNC === 'true';
    await sequelize.sync({ force: forceSync });
    console.log(`Tablas sincronizadas correctamente. force=${forceSync}`);
    // Inserción de roles predeterminados
    await Roles.bulkCreate([
      { Nombre_Rol: "Administrador", Usuario: true, Docente: true, Roles: true, Cursos: true, Horarios: true, Grados: true },
      { Nombre_Rol: "Docente", Usuario: false, Docente: false, Roles: false, Cursos: false, Horarios: false, Grados: false },
      { Nombre_Rol: "Estudiante", Usuario: false, Docente: false, Roles: false, Cursos: false, Horarios: false, Grados: false },
    ]);
    console.log("Roles predeterminados insertados correctamente.");
    
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}
async function crearAdminSiNoExiste() {
  try {
    await sequelize.authenticate();
    // Crea tablas que no existan sin eliminar datos
    await sequelize.sync();

    // Asegurar roles predeterminados (no duplicar)
    const rolesDef = [
      { Nombre_Rol: "Administrador", Usuario: true, Docente: true, Roles: true, Cursos: true, Horarios: true, Grados: true },
      { Nombre_Rol: "Docente", Usuario: false, Docente: false, Roles: false, Cursos: false, Horarios: false, Grados: false },
      { Nombre_Rol: "Estudiante", Usuario: false, Docente: false, Roles: false, Cursos: false, Horarios: false, Grados: false },
    ];
    for (const r of rolesDef) {
      await Roles.findOrCreate({ where: { Nombre_Rol: r.Nombre_Rol }, defaults: r });
    }

    // Buscar rol administrador
    const adminRole = await Roles.findOne({ where: { Nombre_Rol: "Administrador" } });
    const roleId = adminRole ? adminRole.id : 1;

    // Crear usuario admin si no existe
    const [usuario, created] = await Usuario.findOrCreate({
      where: { nombre: "admin@gmail.com" },
      defaults: { contrasenia: "12345678", RoleId: roleId },
    });
    if (created) {
      console.log('Usuario admin creado:', usuario.nombre, 'id=', usuario.id, 'RoleId=', usuario.RoleId || roleId);
    } else {
      console.log('Usuario admin ya existe:', usuario.nombre, 'id=', usuario.id, 'RoleId=', usuario.RoleId || roleId);
    }
  } catch (error) {
    console.error('Error inicializando datos por defecto:', error);
  }
}
module.exports = {
  probarconnexion,
  crearAdminSiNoExiste,
  sequelize,
  Usuario,
  Roles,
  HistorialContrasenia,
  DatosAcademicos,
  DatosPersonales,
};

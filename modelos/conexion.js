const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("postgres://postgres:12345@localhost:5432/InssolBD");
//const sequelize = new Sequelize("postgres://postgres:12345@localhost:5432/ejemplo");
// Sequelize('postgresql://basededatosdelsol_user:SCMg0hfV0FoBuxmRIpz0qfV6OzOCzvOU@dpg-cru1i82j1k6c73e0k7l0-a.virginia-postgres.render.com/basededatosdelsol', {
//const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/ejemplo');
const sequelize = new Sequelize(
  'gestiondenotasinssol', // Nombre de la base de datos
  'gestiondenotasinssol_user', // Usuario
  'VBHWKwOFaNCUzSAIgl2B73UUnoKIqhko', // Contraseña
  {
    host: 'dpg-cuqhmplds78s73ftrgb0-a.oregon-postgres.render.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

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
  Usuario: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Docente: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Roles: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Cursos: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Horarios: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Grados: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});
// Sincronizar base de datos y agregar usuario por defecto
sequelize.sync({ force: false }) // Cambia a `true` solo si quieres borrar y recrear las tablas
  .then(async () => {
    console.log("Base de datos sincronizada");

    // Buscar si ya existe un usuario con el nombre 'admin'
    const usuarioExistente = await Usuario.findOne({ where: { nombre: 'admin' } });

    if (!usuarioExistente) {
      // Crear un usuario admin por defecto si no existe
      await Usuario.create({
        nombre: 'admin',
        contrasenia: 'admin123', // Idealmente deberías encriptarla con bcrypt
        RoleId: 1 // Suponiendo que 1 es el rol de administrador
      });
      console.log("Usuario admin creado por defecto");
    }
  })
  .catch(error => console.error("Error al sincronizar la base de datos:", error));

Roles.hasMany(Usuario);
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

    // Sincronización de tablas (esto eliminará y recreará las tablas si existen)
    await sequelize.sync({ force: true });
    console.log("Tablas sincronizadas correctamente (si existían, se han eliminado y recreado).");
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
module.exports = {
  probarconnexion,
  sequelize,
  Usuario,
  Roles,
  HistorialContrasenia,
  DatosAcademicos,
  DatosPersonales,
};

const { probarconnexion, crearAdminSiNoExiste } = require("./modelos/conexion");
const express = require("express");
const Usuariorutas = require("./rutas/Usuario-rutas");
const DatosAcademicosrutas = require("./rutas/DatosAcademicos-rutas");
const Datospersonalesrutas = require("./rutas/Datospersonales-rutas");
const Historialcontraseniarutas = require("./rutas/Historialcontrasenia-rutas");
const Rolesrutas = require("./rutas/roles-rutas");
const AutenticacionRutas = require('./rutas/autentification-rutas')
const cors = require("cors");

const sess = {
  secret: 'keyboard cat',
  cookie: {}
}
const app = express();
const session = require('express-session')
const _session = session(sess);
app.use(_session);

app.use(cors());
app.use(express.urlencoded({ bodyparser: true }));
app.use(express.json());
app.use(express.static('public'));

const port = process.env.PORT || 3000;

async function init() {
  try {
    // Primero establecer/crear tablas (probarconnexion usa force:true)
    await probarconnexion();
    // Luego crear datos por defecto sin forzar recreado
    await crearAdminSiNoExiste();
    // Arrancar servidor después de inicializar datos
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error('Error en inicialización:', err);
    process.exit(1);
  }
}

init();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/Usuario", Usuariorutas);
app.use("/Roles", Rolesrutas);
app.use("/Historialcontraseniarutas", Historialcontraseniarutas);
app.use("/Datospersonales", Datospersonalesrutas);
app.use("/DatosAcademicos", DatosAcademicosrutas);
app.use("/Autenticacion", AutenticacionRutas);

// server is started from init()

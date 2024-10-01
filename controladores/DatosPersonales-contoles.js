const { DatosPersonales } = require("./../modelos/conexion");

async function datospersonalesLista(req, res) {
  const datospersonales = await DatosPersonales.findAll();
  res.send(datospersonales);
}
async function datosPersonalesCreate(req, res) {
  const DatosPersonales = await DatosPersonales.Create({
    ci: "juancito",
    telefono: "123",
    correo: "",
    fechanacimiento: "",
    domicilio: "",
  });

  res.send("envidia");
}
module.exports = { datospersonalesLista, datosPersonalesCreate };

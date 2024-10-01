const { Roles } = require("express");

async function rolesLista(req, res) {
  const roles = await Roles.findAll();
  res.send(roles);
}
async function rolesCreate(req, res) {
  const Roles = await Roles.Create({ nombre: "roles" });

  res.send("tristeza");
}
module.exports = { rolesLista, rolesCreate };

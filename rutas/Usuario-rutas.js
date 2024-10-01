const express = require("express");
const router = express.Router();

const {
  usuariosLista,
  usuarioCreate,
  actualizarUsuario,
  eliminarUsuario,
} = require("./../controladores/Usuario-controles");

router.get("/lista", usuariosLista);
router.post("/crear", usuarioCreate);

router.put("/actualizar/:id", actualizarUsuario);

router.delete("/eliminar/:id", eliminarUsuario);

module.exports = router;

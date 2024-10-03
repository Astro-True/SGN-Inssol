const express = require("express");
const router = express.Router();

const {
  usuariosLista,
  usuarioCreate,
  actualizarUsuario,
  usuarioDetalle,
  eliminarUsuario,
} = require("./../controladores/Usuario-controles");

router.get("/lista", usuariosLista);
router.get("/detalle/:id", usuarioDetalle);
router.post("/crear", usuarioCreate);

router.put("/actualizar/:id", actualizarUsuario);

router.delete("/eliminar/:id", eliminarUsuario);

module.exports = router;

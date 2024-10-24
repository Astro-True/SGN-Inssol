const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../common/middleware');

const {
  usuariosLista,
  usuarioCreate,
  actualizarUsuario,
  usuarioDetalle,
  eliminarUsuario,
} = require("./../controladores/Usuario-controles");

router.get("/lista",authMiddleware, usuariosLista);
router.get("/detalle/:id",authMiddleware, usuarioDetalle);
router.post("/crear",authMiddleware, usuarioCreate);

router.put("/actualizar/:id",authMiddleware, actualizarUsuario);

router.delete("/eliminar/:id",authMiddleware, eliminarUsuario);

module.exports = router;

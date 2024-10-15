const express = require("express");
const router = express.Router();

const {
  rolesLista,
  rolesUpdate,
} = require("../controladores/Roles-controles");

router.get("/lista", rolesLista);
router.post("/actualizar", rolesUpdate);

module.exports = router;

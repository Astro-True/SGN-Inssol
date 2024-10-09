const express = require("express");
const router = express.Router();

const {
  rolesLista,
  rolesCreate,
} = require("../controladores/Roles-controles");

router.get("/lista", rolesLista);
router.post("/crear", rolesCreate);

module.exports = router;

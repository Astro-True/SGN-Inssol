const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../common/middleware');


const {
  rolesLista,
  rolesUpdate,
} = require("../controladores/Roles-controles");

router.get(`/lista`,authMiddleware, rolesLista);
router.post("/actualizar",authMiddleware, rolesUpdate);

module.exports = router;

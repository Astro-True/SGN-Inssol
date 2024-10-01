const express = require("express");
const router = express.Router();

const {
  historialcontraseniaLista,
  historialcontrasniaCreate,
} = require("./../controladores/Historialcontrasenia-controles");

router.get("/", historialcontraseniaLista);
router.post("/", historialcontrasniaCreate);

module.exports = router;

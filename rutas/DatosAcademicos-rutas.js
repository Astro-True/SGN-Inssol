const {
  datosacademicosLista,
  datosacademicosCreate,
} = require("./../controladores/DatosAcademicos-controles");
const express = require("express");
const router = express.Router();

router.get("/", datosacademicosLista);
router.post("/", datosacademicosCreate);

module.exports = router;

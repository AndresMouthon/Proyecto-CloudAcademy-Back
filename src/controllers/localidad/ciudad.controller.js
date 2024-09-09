const { Ciudad } = require("../../models/localidad/Ciudad.model");
const { limpiarDatosSensibles } = require("../../middlewares/control-flujo-data");

const getTodasLasCiudades = async () => {
    const ciudades = await Ciudad.findAll();
    const camposLimpiar = [
        "update_at",
        "created_at",
    ];
    const ciudadesLimpias = limpiarDatosSensibles(ciudades, camposLimpiar);
    return ciudadesLimpias;
};

module.exports = {
    getTodasLasCiudades,
};
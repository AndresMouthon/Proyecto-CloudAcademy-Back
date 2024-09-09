const { Subdivision } = require("../../models/localidad/Subdivision.model");
const { limpiarDatosSensibles } = require("../../middlewares/control-flujo-data");

const getTodasLasSubdivisiones = async (req, res) => {
    const subdivisiones = await Subdivision.findAll();
    const camposLimpiar = [
        "update_at",
        "created_at",
    ];
    const subdivisionesLimpias = limpiarDatosSensibles(subdivisiones, camposLimpiar);
    return subdivisionesLimpias;
};

module.exports = {
    getTodasLasSubdivisiones,
};
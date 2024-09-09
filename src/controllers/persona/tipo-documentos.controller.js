const { TipoDocumento } = require("../../models/persona/TipoDocumento.model");
const { limpiarDatosSensibles } = require("../../middlewares/control-flujo-data");

const getTodosLosTipoDocumentos = async () => {
    const tiposDocumento = await TipoDocumento.findAll();
    const camposLimpiar = [
        "update_at",
        "created_at",
    ];
    const tiposDocumentoLimpiar = limpiarDatosSensibles(tiposDocumento, camposLimpiar);
    return tiposDocumentoLimpiar;
};

module.exports = { getTodosLosTipoDocumentos };
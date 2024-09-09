const { limpiarDatosSensibles } = require("../../middlewares/control-flujo-data");
const { Departamento } = require("../../models/localidad/Departamento.model");

const getTodosLosDepartamentos = async () => {
    const departamentos = await Departamento.findAll();
    const camposLimpiar = [
        "update_at",
        "created_at",
    ];
    const departamentosLimpios = limpiarDatosSensibles(departamentos, camposLimpiar);
    return departamentosLimpios;
};

module.exports = {
    getTodosLosDepartamentos
};
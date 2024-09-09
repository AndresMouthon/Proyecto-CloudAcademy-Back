const { getPersonaPorDocumento } = require("../../controllers/persona/persona.controller");

const verificarDocumento = async (req, res, next) => {
    try {
        const documento = req.params.documento || req.body.documento;
        const personaExistente = await getPersonaPorDocumento(documento);
        if (personaExistente.length > 0 && req.path.includes('/crear-persona')) {
            return res.json({ mensaje: "La persona ya existe" });
        } else if (personaExistente.length > 0 && req.path.includes('/eliminar-persona')) {
            req.personaExistente = personaExistente;
            return next();
        } else if (personaExistente.length > 0 && req.path.includes('/actualizar-codigo-verificacion')) {
            req.personaExistente = personaExistente;
            return next();
        } else if (personaExistente.length === 0 && (req.path.includes('/actualizar-persona') || req.path.includes('/actualizar-codigo-verificacion') || req.path.includes('/eliminar-persona'))) {
            return res.json({ mensaje: "La persona no existe" });
        };
        next();
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al verificar el documento", error });
    }
};

const verificarEstado = async (req, res, next) => {
    if (req.personaExistente[0].estado === "Activo") {
        return res.json({ mensaje: "La persona no puede ser eliminada ya que se encuentra activa" });
    }
    next();
};

module.exports = {
    verificarDocumento,
    verificarEstado,
};

const ruta = require("express").Router();
const { roles } = require("../../utils/constants.utils");
const { ADMINISTRADOR, RECTOR } = roles;
const { validarBodyPersona } = require("../../schemas/persona/persona.schema");
const {
    getTodasLasPersonasVerificadas,
    getTodasLasPersonasSinVerificar,
    postCrearPersona,
    deleteEliminarPersona,
    putActualizarPersona,
    putActualizarCodigoVerificacion,
} = require("../../controllers/persona/persona.controller");
const { jwtMiddleware } = require("../../middlewares/auth/jwt.middleware");
const { validacionDeParametros } = require("../../middlewares/validaciones.middleware");
const { verificarDocumento, verificarEstado } = require("../../middlewares/persona/persona.middleware");

ruta.get("/todas-las-personas-verificadas",
    jwtMiddleware([ADMINISTRADOR, RECTOR]),
    async (req, res) => {
        getTodasLasPersonasVerificadas()
            .then((getTodasLasPersonasVerificadas) => {
                res.status(200).json(getTodasLasPersonasVerificadas);
            })
            .catch((error) => {
                res.status(400).json({ mensaje: "La peticion fallo", error });
            });
    }
);

ruta.get("/todas-las-personas-sin-verificar",
    jwtMiddleware([ADMINISTRADOR, RECTOR]),
    async (req, res) => {
        getTodasLasPersonasSinVerificar()
            .then((getTodasLasPersonasSinVerificar) => {
                res.status(200).json(getTodasLasPersonasSinVerificar);
            })
            .catch((error) => {
                res.status(400).json({ mensaje: "La peticion fallo", error });
            });
    }
);

ruta.post("/crear-persona",
    jwtMiddleware([ADMINISTRADOR]),
    validarBodyPersona,
    validacionDeParametros,
    verificarDocumento,
    async (req, res) => {
        try {
            const response = await postCrearPersona(req.body);
            res.status(200).json({ mensaje: response });
        } catch (error) {
            res.status(400).json({ mensaje: "La peticion fallo", error });
        };
    }
);

ruta.delete("/eliminar-persona/:documento",
    jwtMiddleware([ADMINISTRADOR]),
    validacionDeParametros,
    verificarDocumento,
    verificarEstado,
    async (req, res) => {
        try {
            const response = await deleteEliminarPersona(req.personaExistente[0].documento);
            res.status(200).json({ mensaje: response });
        } catch (error) {
            res.status(400).json({ mensaje: "La peticion fallo", error });
        };
    }
);

ruta.put("/actualizar-persona/:documento",
    jwtMiddleware([ADMINISTRADOR]),
    validarBodyPersona,
    validacionDeParametros,
    verificarDocumento,
    async (req, res) => {
        try {
            const response = await putActualizarPersona(req.params.documento, req.body);
            res.status(200).json({ mensaje: response });
        } catch (error) {
            res.status(400).json({ mensaje: "La peticion fallo", error });
        };
    }
);

ruta.put("/actualizar-codigo-verificacion/:documento",
    jwtMiddleware([ADMINISTRADOR]),
    validacionDeParametros,
    verificarDocumento,
    async (req, res) => {
        try {
            const response = await putActualizarCodigoVerificacion(req.personaExistente[0].documento, req.personaExistente[0].correo);
            res.status(200).json({ mensaje: response });
        } catch (error) {
            res.status(400).json({ mensaje: "La peticion fallo", error });
        };
    }
);

module.exports = {
    indice: "/personas",
    ruta,
};
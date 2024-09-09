const ruta = require("express").Router();
const {
    getTodosLosTipoDocumentos,
} = require("../../controllers/persona/tipo-documentos.controller");
const { jwtMiddleware } = require("../../middlewares/auth/jwt.middleware");
const { roles } = require("../../utils/constants.utils");
const { ADMINISTRADOR, RECTOR } = roles;

ruta.get("/todos-los-tipos-documento", (req, res) => {   
    jwtMiddleware([ADMINISTRADOR, RECTOR]),
    getTodosLosTipoDocumentos()
        .then((todosLosTipoDocumentos) => {
            res.status(200).json(todosLosTipoDocumentos);
        })
        .catch((error) => {
            res.status(400).json({ mensaje: "La peticion fallo", error });
        });
});

module.exports = { 
    indice: "/tipos-documento",
    ruta,
};
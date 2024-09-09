const ruta = require("express").Router();
const { roles } = require("../../utils/constants.utils");
const { ADMINISTRADOR, RECTOR } = roles;
const { getTodasLasSubdivisiones } = require("../../controllers/localidad/subdivision.controller");
const { jwtMiddleware } = require("../../middlewares/auth/jwt.middleware");

ruta.get("/todas-las-subdivisiones",
    jwtMiddleware([ADMINISTRADOR, RECTOR]),
    (req, res) => {
        getTodasLasSubdivisiones()
            .then((getTodasLasSubdivisiones) => {
                res.status(200).json(getTodasLasSubdivisiones);
            })
            .catch((error) => {
                res.status(400).json({ mensaje: "La peticion fallo", error });
            });
    }
);

module.exports = {
    indice: "/subdivisiones",
    ruta,
};
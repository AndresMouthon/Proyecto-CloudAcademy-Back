const ruta = require("express").Router();
const { roles } = require("../../utils/constants.utils");
const { ADMINISTRADOR, RECTOR } = roles;
const { getTodasLasCiudades } = require("../../controllers/localidad/ciudad.controller");
const { jwtMiddleware } = require("../../middlewares/auth/jwt.middleware");


ruta.get("/todas-las-ciudades",
    jwtMiddleware([ADMINISTRADOR, RECTOR]),
    (req, res) => {
        getTodasLasCiudades()
            .then((getTodasLasCiudades) => {
                res.status(200).json(getTodasLasCiudades);
            })
            .catch((error) => {
                res.status(400).json({ mensaje: "La peticion fallo", error });
            });
    }
);

module.exports = {
    indice: "/ciudades",
    ruta,
}
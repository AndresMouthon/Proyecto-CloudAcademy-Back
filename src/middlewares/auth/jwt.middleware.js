const { desencriptacion } = require("../../utils/crypto.util");
const { verifityToken, verifityRoles } = require("../../utils/jwt.util");

const jwtMiddleware =
    (roles = []) =>
        (req, res, next) => {

            const token = req.header("Authorization");

            if (!token) {
                res.status(401).json({ mensaje: "Token no encontrado" });
                return;
            }

            const [, TOKEN] = token.split(" ");

            if (!TOKEN) {
                res.status(401).json({ mensaje: "Acceso denegado" });
                return;
            }

            const verificado = verifityToken(TOKEN);
            const datosDesencriptados = desencriptacion(verificado.datos);
            const casteoJSON = JSON.parse(datosDesencriptados);



            if (
                casteoJSON === false ||
                verifityRoles(roles, casteoJSON.roles) === false
            ) {
                res.status(401).json({ mensaje: "Acceso denegado" });
                return null;
            }

            req.user = verificado;

            next();
            return null;
        };

module.exports = { jwtMiddleware };

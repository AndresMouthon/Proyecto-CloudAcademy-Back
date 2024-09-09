const jwt = require("jsonwebtoken");
const { ROLES, listaNegra } = require("./constants.utils");

const createToken = (jwData, secreto, expiracion) => {
    const token = jwt.sign(jwData, secreto, expiracion);
    return token;
};

const verifityTimeToken = (token) => {
    const { exp } = jwt.decode(token);
    const tiempoActual = new Date().getTime() / 1000;
    return exp > tiempoActual;
};

const jwtVerifyTimeToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        next();
        return null;
    }
    const [, TOKEN] = token.split(" ");

    if (!TOKEN) {
        next();
        return null;
    }

    if (verifityTimeToken(TOKEN) === false) {
        res.status(401).json({ mensaje: "Token expirado" });
        return null;
    }

    next();
    return null;
};

const verifityToken = (token) => {
    try {
        if (listaNegra.includes(token)) return false;
        const verificado = jwt.verify(token, process.env.JWT_SECRETO);
        return verificado;
    } catch (error) {
        return false;
    }
};

const verifityRoles = (roles = [], rolAcceso = []) => {
    if (roles.length === 0) return true;
    for (const rol of rolAcceso) {
        const encontrado = [...ROLES].find(([, value]) => value === rol.codigo_rol)[1];
        return roles.includes(encontrado);
    };
};


module.exports = {
    createToken,
    verifityTimeToken,
    jwtVerifyTimeToken,
    verifityToken,
    verifityRoles,
};
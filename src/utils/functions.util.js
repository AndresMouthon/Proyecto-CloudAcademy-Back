const { ROLES } = require("./constants.utils");
const bycrypt = require("bcrypt");

const inicializadorDeRoles = () => {

    const rolesEnArray = [
        {
            numeroRol: 1,
            nombreRol: "Administrador",
        },
        {
            numeroRol: 2,
            nombreRol: "Rector",
        },
        {
            numeroRol: 3,
            nombreRol: "Docente",
        },
        {
            numeroRol: 4,
            nombreRol: "Estudiante",
        },
        {
            numeroRol: 5,
            nombreRol: "Acudiente",
        },
    ];
    rolesEnArray.forEach((rol) => {
        ROLES.set(rol.nombreRol, rol.numeroRol);
    });
};
const init = () => {
    inicializadorDeRoles();
};
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bycrypt.hash(password, Number(process.env.SALT_ROUNDS), (err, hash) => {
            if (err) {
                console.error("Error al encriptar la contraseña", err);
                reject(err);
            } else {
                resolve(hash);
            }
        });
    })
};
const comparePassword = (hash, password) => {
    return new Promise((resolve, reject) => {
        bycrypt.compare(password, hash, (err, result) => {
            if (result) {
                resolve(true);
            } else {
                resolve(false);
            };
        });
    });
};
const generateCode = () => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    return codigo;
};
const createPasswordPersona = (nombres, code) => {
    const primerNombre = nombres.split(" ")[0];
    const primerNombreConMayuscula = primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1);
    return `${primerNombreConMayuscula}@${code}`;
};
const formatNameCase = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

module.exports = {
    init,
    hashPassword,
    comparePassword,
    generateCode,
    createPasswordPersona,
    formatNameCase,
};
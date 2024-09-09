const ROLES = new Map();
const listaNegra = new Array(100).fill(null);

const roles = Object.freeze({
    ADMINISTRADOR: 1,
    RECTOR: 2,
    DOCENTE: 3,
    ESTUDIANTE: 4,
    ACUDIENTE: 5,
});

module.exports = {
    ROLES,
    listaNegra,
    roles,
};
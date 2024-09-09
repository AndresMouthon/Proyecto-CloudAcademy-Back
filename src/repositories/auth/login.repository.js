const ejecutarQuery = require("../../../config/data-base.config");

const queryLogin = async (identificacion = "") => {
    const query = `
      WITH personas AS (
        SELECT p.documento, p.correo, p.clave 
        FROM personas p 
        WHERE p.documento = ?
      )
      SELECT u.documento, u.clave, u.codigo_rol, r.rol, u.correo
      FROM (
        SELECT p.documento, p.clave, NULL AS codigo_rol, p.correo
        FROM personas p
        UNION ALL
        SELECT a.identificacion_administrador AS identificacion, p.clave, a.codigo_rol, p.correo
        FROM administradores a
        JOIN personas p ON a.identificacion_administrador = p.documento
        UNION ALL
        SELECT r.identificacion_rector AS identificacion, p.clave, r.codigo_rol, p.correo
        FROM rectores r
        JOIN personas p ON r.identificacion_rector = p.documento
        UNION ALL
        SELECT d.identificacion_docente AS identificacion, p.clave, d.codigo_rol, p.correo
        FROM docentes d
        JOIN personas p ON d.identificacion_docente = p.documento
        UNION ALL
        SELECT e.identificacion_alumno AS identificacion, p.clave, e.codigo_rol, p.correo
        FROM alumnos e
        JOIN personas p ON e.identificacion_alumno = p.documento
        UNION ALL
        SELECT f.identificacion_acudiente AS identificacion, p.clave, f.codigo_rol, p.correo
        FROM acudientes f
        JOIN personas p ON f.identificacion_acudiente = p.documento
      ) AS u
      JOIN roles AS r ON u.codigo_rol = r.id
    `;
    const parametros = [identificacion];
    const response = await ejecutarQuery(query, parametros);
    return response;
};

module.exports = { queryLogin };
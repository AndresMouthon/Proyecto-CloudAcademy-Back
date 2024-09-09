const { createToken } = require("../../utils/jwt.util");
const { encriptacion, LLAVE_SEGUNDA } = require("../../utils/crypto.util");
const { comparePassword } = require("../../utils/functions.util");
const { queryLogin } = require("../../repositories/auth/login.repository");

const login = async (identificacion = "", claveUser = "") => {
  try {
    const response = await queryLogin(identificacion);
    if (response.length > 0) {
      const { clave, correo } = response[0];
      const passwordCompare = await comparePassword(clave, claveUser);

      if (passwordCompare === false) {
        return Promise.reject({ message: "Clave incorrecta!" });
      }

      const roles = response.map(rol => ({
        codigo_rol: rol.codigo_rol
      }));

      const jwtData = {
        correo,
        roles,
      };
      const datosEncriptados = encriptacion(JSON.stringify(jwtData));
      
      const token = createToken(
        { datos: datosEncriptados, llave: LLAVE_SEGUNDA },
        process.env.JWT_SECRETO,
        { expiresIn: "60m" }
      );
      const data = {
        token,
        roles,
      };
      return data;
    };
    return Promise.reject({ message: "¡No existe el usuario!" });
  } catch (error) {
    console.log(error);
    return Promise.reject({ error });
  };
};

module.exports = { login };
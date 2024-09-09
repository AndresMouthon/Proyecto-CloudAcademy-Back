const { Sequelize } = require("sequelize");
const { HOST, DATABASE, USER, PASSWORD } = process.env;
    
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: "mysql",
    logging: false,
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("¡Funciono la conexión al ORM!");
    } catch (error) {
        console.log("No se pudo conectar con el ORM", error);
    }
};

module.exports = {
    sequelize,
    testConnection,
};

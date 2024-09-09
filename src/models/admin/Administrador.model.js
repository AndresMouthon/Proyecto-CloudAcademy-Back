const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Persona } = require("../persona/Persona.model");
const { Rol } = require("./Rol.model");

class Administrador extends Model { };

Administrador.init({
    identificacion_administrador: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Persona,
            key: "documento",
        },
    },
    codigo_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: "id",
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Administrador",
    tableName: "administradores",
    timestamps: false,
});

// Relaciones
// Rector - Persona
Persona.hasOne(Administrador, { foreignKey: 'identificacion_administrador' });
Administrador.belongsTo(Persona, { foreignKey: 'identificacion_administrador' });

// Rector - Rol
Rol.hasOne(Administrador, { foreignKey: 'codigo_rol' });
Administrador.belongsTo(Rol, { foreignKey: 'codigo_rol' });

module.exports = { Administrador };
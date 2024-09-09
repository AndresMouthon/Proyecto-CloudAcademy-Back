const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Persona } = require("../persona/Persona.model");
const { Rol } = require("./Rol.model");

class Rector extends Model { };

Rector.init({
    identificacion_rector: {
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
    modelName: "Rector",
    tableName: "rectores",
    timestamps: false,
});

// Relaciones
// Rector - Persona
Persona.hasOne(Rector, { foreignKey: 'identificacion_rector' });
Rector.belongsTo(Persona, { foreignKey: 'identificacion_rector' });

//Rector - Rol
Rol.hasOne(Rector, { foreignKey: 'codigo_rol' });
Rector.belongsTo(Rol, { foreignKey: 'codigo_rol' });

module.exports = { Rector };
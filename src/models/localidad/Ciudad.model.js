const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Departamento } = require("./Departamento.model");

class Ciudad extends Model { };

Ciudad.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Departamento,
            key: "id",
        },
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
    modelName: "Ciudad",
    tableName: "ciudades",
    timestamps: false,
});

Departamento.hasMany(Ciudad, { foreignKey: 'departamento_id' });
Ciudad.belongsTo(Departamento, { foreignKey: 'departamento_id' });

module.exports = { Ciudad };
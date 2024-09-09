const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/sequelize.config");
const { Ciudad } = require("./Ciudad.model");

class Subdivision extends Model { };

Subdivision.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    subdivision: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ciudad,
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
    modelName: "Subdivision",
    tableName: "subdivisiones",
    timestamps: false,
});

module.exports = { Subdivision };
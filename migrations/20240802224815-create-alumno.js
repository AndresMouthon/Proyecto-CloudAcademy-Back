'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alumnos', {
      identificacion_alumno: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      codigo_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      update_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    }, {
      timestamps: false,
      modelName: "Alumnos",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alumnos');
  }
};
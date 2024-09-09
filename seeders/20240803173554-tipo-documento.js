'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_documentos', [
      {
        tipo_documento: 'Cedula de Ciudadania',
      },
      {
        tipo_documento: 'Tarjeta de Identidad',
      },
      {
        tipo_documento: 'DNI',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

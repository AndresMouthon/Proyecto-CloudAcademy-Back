'use strict';

const { hashPassword } = require('../src/utils/functions.util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('personas', [
      {
        documento: '1003059060',
        nombres: 'Andres',
        apellidos: 'Mouthon',
        tipo_documento_id: 1,
        genero: 'Masculino',
        correo: 'andresdomingomouthon541@.gmail.com',
        contacto: '3022125226',
        estado: 'Activo',
        verificado: true,
        codigo_verificacion: 1803,
        departamento_id: 1,
        ciudad_id: 1,
        zona: 'Urbana',
        direccion: 'Calle 4 # 15A - 70',
        clave: await hashPassword('Andres@123'),
        fecha_nacimiento: '2002-03-29',
        edad: 22,
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

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto_integrador', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432'
});

module.exports = sequelize;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pessoa_fisica: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'cliente',
  timestamps: false
});

module.exports = Cliente;

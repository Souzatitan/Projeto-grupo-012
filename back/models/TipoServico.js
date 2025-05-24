const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoServico = sequelize.define('tipo_servico', {
  id_tipo_servico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'tipo_servico',
  timestamps: false
});

module.exports = TipoServico;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoServicoRealizado = sequelize.define('tipo_servico_realizado', {
  id_tipo_servico_realizado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_servico: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'tipo_servico_realizado',
  timestamps: false
});

// Importa os models relacionados
const Cliente = require('./Cliente');
const TipoServico = require('./TipoServico');
const Administrador = require('./Administrador');

// Associações
TipoServicoRealizado.belongsTo(Cliente, { foreignKey: 'id_cliente' });
TipoServicoRealizado.belongsTo(TipoServico, { foreignKey: 'id_tipo_servico' });
TipoServicoRealizado.belongsTo(Administrador, { foreignKey: 'id_usuario' });

module.exports = TipoServicoRealizado;

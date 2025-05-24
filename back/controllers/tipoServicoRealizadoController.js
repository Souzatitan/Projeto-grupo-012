const TipoServicoRealizado = require('../models/TipoServicoRealizado');
const Cliente = require('../models/Cliente');
const TipoServico = require('../models/TipoServico');
const Administrador = require('../models/Administrador');

module.exports = {
  // VISÍVEL PARA TODOS
  async listar(req, res) {
    try {
      const lista = await TipoServicoRealizado.findAll({
        include: [Cliente, TipoServico, Administrador]
      });
      res.json(lista);
    } catch (error) {
      console.error('Erro ao listar serviços realizados:', error);
      res.status(500).json({ error: 'Erro ao listar serviços realizados' });
    }
  },

  // APENAS ADMIN
  async criar(req, res) {
    const { id_usuario, id_cliente, id_tipo_servico, data } = req.body;
    try {
      const novo = await TipoServicoRealizado.create({
        id_usuario,
        id_cliente,
        id_tipo_servico,
        data
      });
      res.status(201).json(novo);
    } catch (error) {
      console.error('Erro ao criar serviço realizado:', error);
      res.status(500).json({ error: 'Erro ao criar serviço realizado' });
    }
  },

  // APENAS ADMIN
  async atualizar(req, res) {
    const { id } = req.params;
    const { id_usuario, id_cliente, id_tipo_servico, data } = req.body;
    try {
      await TipoServicoRealizado.update({
        id_usuario,
        id_cliente,
        id_tipo_servico,
        data
      }, {
        where: { id_tipo_servico_realizado: id }
      });
      res.json({ mensagem: 'Serviço realizado atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar serviço realizado:', error);
      res.status(500).json({ error: 'Erro ao atualizar serviço realizado' });
    }
  },

  // APENAS ADMIN
  async deletar(req, res) {
    const { id } = req.params;
    try {
      await TipoServicoRealizado.destroy({
        where: { id_tipo_servico_realizado: id }
      });
      res.json({ mensagem: 'Serviço realizado deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar serviço realizado:', error);
      res.status(500).json({ error: 'Erro ao deletar serviço realizado' });
    }
  }
};

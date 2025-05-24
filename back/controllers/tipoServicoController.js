const TipoServico = require('../models/TipoServico')

module.exports = {
  async listar(req, res) {
    try {
      const servicos = await TipoServico.findAll();
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar tipos de serviço' });
    }
  },

  async criar(req, res) {
    const { nome, descricao, valor } = req.body;
    try {
      const novoServico = await TipoServico.create({ nome, descricao, valor });
      res.status(201).json(novoServico);
    } catch (error) {
        
      res.status(500).json({ error: 'Erro ao criar tipo de serviço' });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, descricao, valor } = req.body;
    try {
      await TipoServico.update({ nome, descricao, valor }, {
        where: { id_tipo_servico: id }
      });
      res.json({ mensagem: 'Tipo de serviço atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tipo de serviço' });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      await TipoServico.destroy({ where: { id_tipo_servico: id } });
      res.json({ mensagem: 'Tipo de serviço deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tipo de serviço' });
    }
  }
};

const Cliente = require('../models/Cliente');

module.exports = {
  async listar(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  },

  async criar(req, res) {
    const { nome, endereco, pessoa_fisica } = req.body;
    try {
      const cliente = await Cliente.create({ nome, endereco, pessoa_fisica });
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, endereco, pessoa_fisica } = req.body;
    try {
      await Cliente.update({ nome, endereco, pessoa_fisica }, {
        where: { id_cliente: id }
      });
      res.json({ mensagem: 'Cliente atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      await Cliente.destroy({ where: { id_cliente: id } });
      res.json({ mensagem: 'Cliente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
};

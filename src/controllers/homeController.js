const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const contatos = await Contato.bucaContatos();
  res.render('index', {contatos});
};


const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(()=>{
        return res.redirect('/contato/index')
      })
      return
    }
    
    req.flash('success', 'Constato Registrado com sucesso');
    req.session.save(()=> res.redirect('/'));
    return;
  
  } catch (e) {
    console.log(e)
    res.render('404');
  }
}

exports.edit = async function (req, res){
  if(!req.params.id) return res.render('404');
  const contato = new Contato(req.body)
  
  try {
    await contato.edit(req.params.id);
    
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(()=>{
        return res.redirect('/contato/index')
      })
      return
    }
    
    req.flash('success', 'Constato editado com sucesso');
    req.session.save(()=> res.redirect('back'));
    return;
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

exports.editIndex = async function (req, res){
  if(!req.params.id) return res.render('404');
  if(typeof req.params.id !== 'string') return ;
  
  const contato = await Contato.buscaPorId(req.params.id)
  if(!contato)return res.render('404');
 
  return res.render('contato',{contato});
}

exports.delete = async (req,res)=>{
  if(!req.params.id) return res.render('404');
  if(typeof req.params.id !== 'string') return ;
  
  const contato = await Contato.delete(req.params.id)
  if(!contato)return res.render('404');
 
  req.flash('success', 'Constato Apagado com sucesso com sucesso');
  req.session.save(()=> res.redirect('/'));
  return;
}
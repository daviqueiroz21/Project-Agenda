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

exports.editIndex = async function (req, res){
  if(!req.params.id) return res.render('404');
  if(typeof req.params.id !== 'string') return ;
  
  const contato = await Contato.buscaPorId(req.params.id)
  if(!contato)return res.render('404');
 
  return res.render('contato',{contato});
}
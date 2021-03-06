const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  // recuperar el locale que nos pasan
  const locale = req.params.locale;

  // guardar la página de la que viene para poder volver
  const goBack = req.get('referer');

  // establecemos cookie del nuevo idioma
  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 }); // maxAge va en ms

  // redireccionamos a la página de la que venía
  res.redirect(goBack);
});

module.exports = router;
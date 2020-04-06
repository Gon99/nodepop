'use strict';

const express = require('express');
const router = express.Router();

const Advertisements = require('../models/Advertisements');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Nodepop' });
});

/*router.get('/', async (req, res, next) => {
  try {
    console.log("antes");
    const docs = Advertisements.lista();
    console.log("despues");
    console.log("resp: ", docs);
    const resp = docs;
    console.log("buenaaaa", resp);
    res.render('index', { title: 'Nodepop' });
  } catch (error) {
    next(error);
  }
  
  try {
      const response = await Advertisement.lista();
      console.log("respuesta otra: ", response);
      console.log("respuesta otra json", JSON(response));
      res.render('index', { title: response});
  } catch (error) {
      next(error);
  }
});*/

module.exports = router;

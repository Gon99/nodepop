'use strict';

const express = require('express');
const router = express.Router();
const { query, check, validationResult } = require('express-validator');
//const querystring = require('querystring');

const Advertisements = require('../models/Advertisements');

/* GET home page. */
router.get('/', [
  check('venta').isBoolean().withMessage('should be boolean'),
],
 async (req, res, next) => {
  //validationResult(req).throw();
  /*const errors = validationResult(req);
  if (!errors.isEmpty()){
    const error = new Error('Invalid value');
    error.status = 422;
    next(error);
  }*/
  const limit = parseInt(req.query.limit || 1000);
  const skip = parseInt(req.query.skip);
  const sort = req.query.sort;
  const nombre = req.query.nombre;
  const venta = req.query.venta;

  const precio = req.query.precio;
  //const signoPrecio = req.query.precio.replace(/[^0-9.]/g, "");
  const tag = req.query.tag;
  const filter = {};

  if (typeof nombre !== 'undefined') {
    filter.nombre = new RegExp(nombre, 'i');
  }
  if (typeof tag !== 'undefined') {
    filter.tags = tag;
  }
  if (typeof venta !== 'undefined'){
    filter.venta = venta;
  }
  if (typeof precio !== 'undefined') {
    filter.precio = { $gt : precio };
    //const signoPrecio = req.query.precio.replace(/[^0-9.]/g, "");
    //console.log("signoo ", signoPrecio);
  }
  const allTags = await Advertisements.allTags();
  console.log(`los tags son ${allTags}`);
  const advertisements = await Advertisements.lista(filter,limit,skip,sort);
  if (advertisements.length === 0){
    res.send('There are no products with those filters');
  }
  
  res.render('index', {
    title: 'Nodepop',
    advertisements: advertisements,
  });
});

module.exports = router;

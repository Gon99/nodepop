'use strict';

const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const Advertisements = require('../models/Advertisements');

/* GET home page. */
router.get('/', [
  query('venta').isBoolean().withMessage('should be boolean'),
],
 async (req, res, next) => {
  const limit = parseInt(req.query.limit || 1000);
  const skip = parseInt(req.query.skip);
  const sort = req.query.sort;
  const nombre = req.query.nombre;
  const venta = req.query.venta;

  const precio = req.query.precio;
  const tag = req.query.tag;
  const filter = {};

  if (typeof nombre !== 'undefined') {
    filter.nombre = new RegExp(nombre, 'i');
  }
  if (typeof tag !== 'undefined') {
    filter.tags = tag;
  }
  if (typeof venta !== 'undefined'){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ error: errors.array()})
    }
    filter.venta = venta;
  }
  if (typeof precio !== 'undefined') {
    if (precio.includes('-')){
      const firstNumber = getFirstNumber(precio);
      if (checkSign(precio) === 0){
        filter.precio = { $lt : precio.substr(1)};
      }else{
        if (!firstNumber){
          next(new Error('Invalid value'));
        }
        const secondNumber = getSecondNumber(precio);
        if (secondNumber){
          filter.precio = { $gt : firstNumber , $lt: secondNumber};
        }else{
          filter.precio = { $gt : firstNumber };
        }
      }
    }else{
      const precioInt = parseInt(precio);
      if(precioInt){
        filter.precio = precioInt;
      }else{
        next(new Error('Invalid value'));
      }

    }
  }
  const advertisements = await Advertisements.lista(filter,limit,skip,sort);
  if (advertisements.length === 0){
    res.send('There are no products with those filters');
  }
  
  res.render('index', {
    advertisements: advertisements,
  });
});

const getSecondNumber = (price) => {
  let secondNumber = '';
  let pos = price.indexOf('-');
  while (pos < price.length - 1){
    pos++;
    secondNumber += price[pos];
  }
  return secondNumber;
}

const checkSign = (price) => {
  if (price[0] === '-'){
    return(0);
  }
  return(1);
}

const getFirstNumber = (price) => {
  let firstNumber = '';
  for (let index = 0; price[index] != '-'; index++) {
    firstNumber += price[index];
  }
  return firstNumber;
}

module.exports = router;

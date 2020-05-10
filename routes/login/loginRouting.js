'use strict';

const express = require('express');
const router = express.Router();
const loginController = require('./loginController');

/*router.get('/', loginController.index);
router.post('/', loginController.post);*/
router.get('/', (req, res, next) => {
    console.log("hola");
   switch (req.baseUrl) {
       case '/login':
           res.render('login', {
               error: ''
           });
           break;
        case '/logout':
            res.cookie('token', '');
            res.redirect('/');
            break;
       default:
           break;
   }
});

router.post('/', loginController.post);

module.exports = router;
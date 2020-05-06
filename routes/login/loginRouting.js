'use strict';

const express = require('express');
const router = express.Router();
const loginController = require('./loginController');

router.get('/', loginController.index);
router.post('/', loginController.post);
//app.get('/',loginContoller.logout);

module.exports = router;
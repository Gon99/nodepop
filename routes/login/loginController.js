'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

class LoginController {
    index(req, res, next){
        res.render('login',{
            error: ''
        });
    }

    async post(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({ email });
            
            if (!user || !bcrypt.compareSync(password, user.password)){
                // const error = new Error('Invalid credentials');
                // error.status = 401;
                console.log("entrp");
                res.render('login', {
                    error: 'Invalid credentials',
                });
                return;
            }
            const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '2d'
            });
            res.cookie('token', token);
            res.redirect('/');

            //res.json({token});
        } catch (err){
            next(err);
        }
    }
}

module.exports = new LoginController();
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});

userSchema.statics.hashPassword = function(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
}

const User = mongoose.model('User', userSchema);

module.exports = User;

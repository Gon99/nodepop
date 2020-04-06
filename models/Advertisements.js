'use strict';

const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

advertisementSchema.statics.lista = function(){
    const query = Advertisements.find();
    return query.exec();
};

const Advertisements = mongoose.model('Advertisements', advertisementSchema);

module.exports = Advertisements;
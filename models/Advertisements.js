'use strict';

const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

advertisementSchema.statics.lista = function(filter, limit, skip, sort){
    const query = Advertisements.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    return query.exec();
};

advertisementSchema.statics.allTags = async function(){
    return await Advertisements.distinct('tags');
    /*return this.find({
        nombre: new RegExp(filter.nombre, 'i'),
    });*/
}

const Advertisements = mongoose.model('Advertisements', advertisementSchema);

module.exports = Advertisements;
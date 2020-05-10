'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images'});
const Advertisement = require('../../models/Advertisements');

/*
    GET /api/advertisements 
    Get all ads from database
*/
router.get('/', async (req, res, next) => {
    try {
        const ads = await Advertisement.find();
        
        res.json(ads);
    } catch (error) {
        next(error);
    }
});

/* 
    POST /api/advertisements
    Create an ad
*/
router.post('/', upload.single('originalFoto'), async (req, res, next) => {
    try {
        const adData = req.body;
        const pusblisher = require('../microservices/thumbnail_publisher');

        pusblisher(req.file.filename);
        adData.foto = {
            originalFoto: req.file.filename,
            thumbnail: req.file.filename + '_thumbnail'
        }

        const newAd = new Advertisement(adData);
        const savedAd = await newAd.save();

        res.status(201).json({ result: savedAd });
    } catch (error) {
        next(error);
    }
});

/*
    PUT /api/advertisements
    Update an specific ad by id
*/
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const adData = req.body;

        const savedData = await Advertisement.findOneAndUpdate({_id: _id}, adData, {
            new: true,
            useFindAndModify: false,
        });
        res.json({
            result: savedData, 
            message: 'Advertisement updated correctly',
        });
    } catch (error) {
        next(error);
    }
})

/*
    GET /api/advertisements
    Get an specific ad by id
*/
router.get('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        const advertisement = await Advertisement.findOne({_id});
        if (!advertisement){
            const error = new Error('not found');
            error.status = 404;
            return next(error);
        }
        res.json({ result: advertisement })
    } catch (error) {
        next(error);
    }
})

/*
    DELETE /api/advertisements
    Remove an specific advertisements by id
*/
router.delete('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;

        await Advertisement.deleteOne({_id});
        res.json({ message: 'The advertisement has been removed correctly'});
    }catch(error){
        next(error);
    }
})

module.exports = router;
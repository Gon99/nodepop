'use strict';

const express = require('express');
const router = express.Router();
const Advertisements = require('../../models/Advertisements');

/*
    GET /api/advertisements/tags
    Shows all the differents tags availables for the advertisements
*/
router.get('/', async(req, res, next) => {
    try {
        const allTags = await Advertisements.allTags();

        res.json({
            tags: allTags
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;
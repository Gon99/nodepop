'use strict';

const conn = require('./lib/connectMongoose');
const Advertisement = require('./models/Advertisements');

conn.once('open', async () => {
    try {
        await initAdvertisements();    
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
});

async function initAdvertisements() {
    const adsFile = require('./advertisements/advertisements.json');
    await Advertisement.deleteMany();
    await Advertisement.insertMany(adsFile.anuncios, function(err){
        if (err) {
            throw new Error(err);
        }else{
            conn.close();
        }
    });
}

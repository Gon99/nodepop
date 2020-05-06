'use strict';

const conn = require('./lib/connectMongoose');
const Advertisement = require('./models/Advertisements');
const Users = require('./models/Users');

conn.once('open', async () => {
    try {
        await initAdvertisements();
        await initUsers();
        conn.close();
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
});

async function initAdvertisements() {
    const adsFile = require('./json/advertisements.json');
    await Advertisement.deleteMany();
    await Advertisement.insertMany(adsFile.anuncios);
}

async function initUsers() {
    await Users.deleteMany();
    await Users.insertMany([
        {
            email: 'user@example.com',
            password: await Users.hashPassword('1234')
        },
        {
            email: 'senor11511@gmail.com',
            password: await Users.hashPassword('123456789')
        }
    ]);
}
'use strict';

const conn = require('./lib/connectMongoose');
const Advertisement = require('./models/Advertisement');

conn.once('open', async () => {
    try {
        await initAdvertisements();
        conn.close();     
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
});

async function initAdvertisements() {
    await Advertisement.deleteMany();
    await Advertisement.insertMany([
        {   
            nombre: "Bicicleta",
            venta: true,
            precio: 230.15,
            foto: "bici.jpg",
            tags: ["lifestyle", "motor"]
        },
        {  
            nombre: "iPhone 3GS",
            venta: false,
            precio: 50.00,
            foto: "iphone.png",
            tags: ["lifestyle", "mobile"]
        }
    ]);
}

/*const initAdvertisements = async () => {
    await Advertisement.deleteMany();
    await Advertisement.insertMany([
        {   
            nombre: "Bicicleta",
            venta: true,
            precio: 230.15,
            foto: "bici.jpg",
            tags: ["lifestyle", "motor"]
        },
        {  
            nombre: "iPhone 3GS",
            venta: false,
            precio: 50.00,
            foto: "iphone.png",
            tags: ["lifestyle", "mobile"]
        }
    ]);
}*/
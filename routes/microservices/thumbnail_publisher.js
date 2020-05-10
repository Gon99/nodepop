'use strict';

const connectionPromise = require('../../lib/connectAMQP');
const queueName = 'images';

main().catch(err => console.log('Ha surgido un error: ', err));

async function main(image){
    console.log("llega la imagem", image);
    const conn = await connectionPromise;
    const channel = await conn.createChannel();

    await channel.assertQueue(queueName, {
        durable: true,
    });
    let sendAgain = true;
    const message = {
        text: `Creando thumbnail para imagen: ${image}`,
        imagePath: image
    }

    if (!sendAgain){
        console.log('Waiting drain event...');
        await new Promise(resolve => channel.on('drain', resolve));
    }

    sendAgain = channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message))),{
        persistent: true
    }

    console.log(`creando thumbnail de la imagen: ${image} con resultado ${sendAgain}`);
}

module.exports = main;
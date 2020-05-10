'use strict';
const connectionPromise = require('../../lib/connectAMQP');
const queueName = 'images';
const Jimp = require('jimp');

main().catch( err => console.log('Hubo un error:', err));

async function main() {
    const conn = await connectionPromise;
    const channel = await conn.createChannel();

    await channel.assertQueue(queueName, {});
    channel.prefetch(1);
    channel.consume(queueName, message => {
        const jsonMessage = JSON.parse(message.content);
        const image = jsonMessage.imagePath;

        if (image){
            Jimp.read(`${process.cwd()}/public/images/${image}`)
                .then(thumbnail => {
                    return thumbnail
                        .resize(100, 100)
                        .quality(100)
                        .write(`${process.cwd()}/public/images/${image}_thumbnail`)
                })
                .catch(err => {
                    console.log('Ha surgido un error', err)
                });
        }
        channel.ack(message);
    });
}
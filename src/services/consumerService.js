const amqp = require('amqplib');
const config = require('../config/config');
const { connectToRabbitMQ } = require('../utils/connectToRabbitMQ');
const logger = require('../config/logger');

async function consumeMessage() {
    try {
        const channel = await connectToRabbitMQ();

        await channel.assertExchange(config.exchange, 'direct', { durable: false });
        await channel.assertQueue(config.queue, { durable: false });
        await channel.bindQueue(config.queue, config.exchange, config.routingKey);

        channel.consume(config.queue, (msg) => {
            const message = JSON.parse(msg.content.toString());
            logger.info(`Received message: ${JSON.stringify(message)}`);
        }, { noAck: true });
    } catch (error) {
        logger.error('Error consuming message:', error);
        throw error;
    }
}

module.exports = { consumeMessage };
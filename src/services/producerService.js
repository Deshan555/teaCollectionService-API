const amqp = require('amqplib');
const { connectToRabbitMQ } = require('../utils/connectToRabbitMQ');
const config = require('../config/config');
const logger = require('../config/logger');

async function produceMessage(message) {
    try {
        const channel = await connectToRabbitMQ();

        await channel.assertExchange(config.exchange, 'direct', { durable: false });
        await channel.assertQueue(config.queue, { durable: false });
        await channel.bindQueue(config.queue, config.exchange, config.routingKey);

        await channel.publish(config.exchange, config.routingKey, Buffer.from(JSON.stringify(message)));
        logger.info(`Message sent: ${JSON.stringify(message)}`);
    } catch (error) {
        logger.error('Error producing message:', error);
        throw error;
    }
}

module.exports = { produceMessage };
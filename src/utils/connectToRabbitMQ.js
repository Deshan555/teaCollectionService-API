const amqp = require('amqplib');
const config = require('../config/config');
const logger = require('../config/logger');

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect(config.amqpUrl);
        return await connection.createChannel();
    } catch (error) {
        logger.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}

module.exports = { connectToRabbitMQ };
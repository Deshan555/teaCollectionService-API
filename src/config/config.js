const config = {
    amqpUrl: 'amqp://localhost',
    exchange: 'dailyTeaCollection.exchange',
    queue: 'dailyTeaCollection.queue',
    routingKey: 'dailyTeaCollection.key',
    port: 3001,
};

module.exports = config;
const express = require('express');
const producerRouter = require('./src/routes/routes');
const {consumeMessage} = require('./src/services/consumerService');
const config = require('./src/config/config');
const logger = require('morgan');
const logs = require('./src/config/logger');

const app = express();
app.use(logger('dev'));
app.use(express.json());

consumeMessage().then(r =>
    logs.info('CloudAMQP Consumer Started')
).catch(e => {
        logs.error('Error consuming message:', e);
        throw e;
    }
);

app.use('/thaprobane/collector/v01', producerRouter);

app.listen(config.port, () => {
    logs.info(`Server is running at http://localhost:${config.port}`);
});

const mysql = require('mysql');
const util = require('util');
const logger = require('./logger');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TeaCooperative',
});

const query = util.promisify(db.query).bind(db);

db.connect(err => {
    if (err) {
        logger.error('Error connecting to the database:', err);
    } else {
        logger.info('Connected to the database : ' + db.config.database);
    }
});

module.exports = { db, query };
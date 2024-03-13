const MYSQL = require('mysql2')

// Create the connection pool. The pool-specific settings are the defaults
const pool = MYSQL.createPool({
    host: 'localhost',
    user: 'root',
    database: 'practical',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

pool.query(`select * from orders`, (error, result, fields) => {
    if (error) {
        return console.log(error);
    }
    return console.log(result, "MYSQL database connected!")
})

module.exports = pool;
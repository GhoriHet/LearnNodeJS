const MYSQL = require('mysql2')

const pool = MYSQL.createPool({
    host: 'localhost',
    user: 'root',
    database: 'practical',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// pool.query(`select * from orders`, (error, result, fields) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log(result)
//     return console.log("MYSQL database connected!");
// })

const poolPromise = pool.promise();
module.exports = poolPromise;
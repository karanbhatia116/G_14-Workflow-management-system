const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'eepmrtopbmkrkx',
    host: 'ec2-54-211-176-156.compute-1.amazonaws.com',
    database: 'dem1hqoen3pq79',
    password: '03e432207f7ae469e4ddf387f47ee4bc1b2a51cb0cba14c11c89df82bd0d5b30',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    pool
};
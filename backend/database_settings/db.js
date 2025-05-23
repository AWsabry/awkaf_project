const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'awkaf_db',
  password: 'AWsabry2000',
  port: 5432,
});

module.exports = pool;

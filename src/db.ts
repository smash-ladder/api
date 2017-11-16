const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  database: 'smash_ladder'
});

export default pool;

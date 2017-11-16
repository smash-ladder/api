const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool({});

export default pool;

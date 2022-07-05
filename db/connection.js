const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    password: '275gtb4!',
    database: 'employee_tracker'
  });

module.exports = db;
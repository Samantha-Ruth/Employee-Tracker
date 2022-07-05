const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// View all departments (id, name)
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
                  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });




// Add department

// View total utilized budget of a department

// delete departments, roles, and employees


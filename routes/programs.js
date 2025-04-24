const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Create a new program
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Program name is required' });

  db.run(`INSERT INTO programs (name) VALUES (?)`, [name], function (err) {
    if (err) return res.status(400).json({ error: 'Program may already exist or invalid input' });
    res.status(201).json({ id: this.lastID, name });
  });
});

// List all programs
router.get('/', (req, res) => {
  db.all(`SELECT * FROM programs`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;

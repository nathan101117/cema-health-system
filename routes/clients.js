const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Register a new client
router.post('/', (req, res) => {
  const { name, age, gender } = req.body;
  if (!name || !age || !gender) {
    return res.status(400).json({ error: 'Name, age, and gender are required' });
  }

  db.run(
    `INSERT INTO clients (name, age, gender) VALUES (?, ?, ?)`,
    [name, age, gender],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, age, gender });
    }
  );
});

// Search clients (or list all if no search query)
router.get('/', (req, res) => {
  const search = req.query.search;
  let sql = `SELECT * FROM clients`;
  let params = [];

  if (search) {
    sql += ` WHERE name LIKE ?`;
    params.push(`%${search}%`);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Enroll a client in one or more programs
router.post('/:id/enroll', (req, res) => {
    const clientId = req.params.id;
    const { programIds } = req.body; // should be an array
  
    if (!Array.isArray(programIds) || programIds.length === 0) {
      return res.status(400).json({ error: 'Provide an array of program IDs' });
    }
  
    const placeholders = programIds.map(() => '(?, ?)').join(', ');
    const values = programIds.flatMap(programId => [clientId, programId]);
  
    const sql = `INSERT INTO enrollments (client_id, program_id) VALUES ${placeholders}`;
  
    db.run(sql, values, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Client enrolled successfully' });
    });
  });

  // Get full client profile (including enrolled programs)
router.get('/:id', (req, res) => {
    const clientId = req.params.id;
  
    // Fetch client info
    db.get(`SELECT * FROM clients WHERE id = ?`, [clientId], (err, client) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!client) return res.status(404).json({ error: 'Client not found' });
  
      // Fetch enrolled programs
      const sql = `
        SELECT p.id, p.name
        FROM enrollments e
        JOIN programs p ON e.program_id = p.id
        WHERE e.client_id = ?
      `;
  
      db.all(sql, [clientId], (err, programs) => {
        if (err) return res.status(500).json({ error: err.message });
  
        res.json({
          ...client,
          enrolledPrograms: programs
        });
      });
    });
  });
  

module.exports = router;

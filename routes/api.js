const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Public endpoint to get a client profile with enrolled programs
router.get('/clients/:id', (req, res) => {
  const clientId = req.params.id;

  db.get(`SELECT * FROM clients WHERE id = ?`, [clientId], (err, client) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!client) return res.status(404).json({ error: 'Client not found' });

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

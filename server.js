const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3003;

// Create MySQL connection pool
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Qazwsxdf01-_',
  database: 'verses'
};

// API endpoint to get verses from your table
app.get('/api/verses', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM verses');
    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Serve your verses.html on root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'verses.html'));
});

// Serve static files (css, js)
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3003`);
});
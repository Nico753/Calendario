const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa il pacchetto cors

const app = express();
const port = 3000;

// Usa il middleware cors per abilitare CORS
app.use(cors({
  origin: '*', // Permette tutte le origini
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Usa il middleware body-parser per parsare il body delle richieste POST
app.use(bodyParser.json());

// Percorso al file data.json
const jsonFilePath = path.join(__dirname, 'data.json');

// GET route: restituisce il contenuto di data.json
app.get('/data', async (req, res) => {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Errore nella lettura del file', details: err.message });
  }
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

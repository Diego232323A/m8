const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../M6_CheckConnection_Mysql/checkConnection'); // Importar la conexión a la base de datos

const app = express();
const PORT = 4000;

// Configurar middleware
app.use(bodyParser.json());

// Crear tabla de hoteles si no existe
connection.query(`CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id VARCHAR(255),
  name VARCHAR(255),
  address VARCHAR(255),
  review_score VARCHAR(255),
  price VARCHAR(255),
  currency VARCHAR(255),
  free_parking BOOLEAN,
  free_cancellation BOOLEAN
)`, (err, result) => {
  if (err) throw err;
  console.log('Hotels table created or already exists');
});

// Endpoint para almacenar hoteles
app.post('/store-hotels', (req, res) => {
  const hotels = req.body;

  if (!Array.isArray(hotels)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array of hotels.' });
  }

  const sql = `INSERT INTO hotels (
    hotel_id, name, address, review_score, price, currency, free_parking, free_cancellation
  ) VALUES ?`;

  const values = hotels.map(hotel => [
    hotel.id,
    hotel.name,
    hotel.address,
    hotel.review_score,
    hotel.price,
    hotel.currency,
    hotel.free_parking ? 1 : 0,
    hotel.free_cancellation ? 1 : 0
  ]);

  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Hotels stored successfully' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Storage microservice running on port ${PORT}`);
});

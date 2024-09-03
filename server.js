// server.js (Backend en Node.js)
const express = require('express');
const cors = require('cors');
const app = express();

let camisetas = [
    { id: 1, nombre: "Camiseta Real Madrid", precio: "80 MIL", imagen: "https://via.placeholder.com/200x250" },
    { id: 2, nombre: "Camiseta Barcelona", precio: "75 MIL", imagen: "https://via.placeholder.com/200x250" },
    { id: 3, nombre: "Camiseta Manchester United", precio: "85 MIL", imagen: "https://via.placeholder.com/200x250" }
];

app.use(cors());
app.use(express.json());

// Ruta para obtener camisetas
app.get('/api/camisetas', (req, res) => {
    res.json(camisetas);
});

// Ruta para agregar una camiseta
app.post('/api/camisetas', (req, res) => {
    const nuevaCamiseta = req.body;
    nuevaCamiseta.id = camisetas.length + 1; // Generar un ID único
    camisetas.push(nuevaCamiseta); // Agregar la nueva camiseta al array

    console.log('Camiseta agregada:', nuevaCamiseta); // Imprimir la nueva camiseta
    console.log('Lista de camisetas:', camisetas);    // Imprimir la lista completa

    res.json(nuevaCamiseta); // Enviar la nueva camiseta como respuesta
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

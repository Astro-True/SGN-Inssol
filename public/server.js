
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const { Pool } = require('pg');
// const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ejemplo',
    password: '12345',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// Ruta para manejar el login
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
console.log(username);
console.log(password);
    try {
        const result = await pool.query('SELECT * FROM usuario WHERE nombre = $1 AND contrasenia = $2', [username, password]);

        if (result.rows.length > 0) {
            res.status(200).send({ message: 'Login exitoso' });
        } else {
            res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al consultar la base de datos', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
});
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:${port}');
});
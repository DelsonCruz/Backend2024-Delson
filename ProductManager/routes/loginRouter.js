import express from 'express';
import exphbs from 'express-handlebars';

const app = express();
const PORT = 8001;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Ruta para mostrar el formulario de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para manejar el envío del formulario de login
app.post('/login', (req, res) => {
    // Aquí maneja la lógica de autenticación (ver punto 3)
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8001');
});

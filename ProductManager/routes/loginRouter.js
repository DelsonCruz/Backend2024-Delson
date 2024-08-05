import express from 'express';
// import exphbs from 'express-handlebars';


const loginRouter = express();
const PORT = 8001;

// loginRouter.engine('handlebars', exphbs());
loginRouter.set('view engine', 'handlebars');

// Ruta para mostrar el formulario de login
loginRouter.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para manejar el envío del formulario de login
loginRouter.post('/login', (req, res) => {
    // Aquí maneja la lógica de autenticación (ver punto 3)
});


loginRouter.listen(PORT, () => {
    
});


export default loginRouter;
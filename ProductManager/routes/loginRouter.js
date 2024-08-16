import express from 'express';
import exphbs from 'express-handlebars';


const loginRouter = express();
const PORT = 8001;

loginRouter.engine('handlebars', exphbs());
loginRouter.set('view engine', 'handlebars');


loginRouter.get('/login', (req, res) => {
    res.render('login');
});


loginRouter.post('/login', (req, res) => {
    
});


loginRouter.listen(PORT, () => {
    
});


export default loginRouter;

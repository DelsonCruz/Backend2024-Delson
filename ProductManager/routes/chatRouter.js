import { Router } from "express";

const chatRouter = Router()

chatRouter.get('/', (req, res) => {

    
    
    // no se consulta el array en la ruta "templates/chat", {}
    // res.render("templates/chat", {})
})

export default chatRouter
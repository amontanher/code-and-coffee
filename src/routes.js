const express = require('express');
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

// req.query = Acessar query params (filtros)
// req.params = Acessar route params (edição, delete)
// req.body = Acessar corpo da requisição (criação, edição)

routes.get('/', (req, res)=>{
    return res.send("welcome");
});

routes.post('/sessions', SessionController.store);

// ROTA DE USUARIO - EMAIL

module.exports = routes;
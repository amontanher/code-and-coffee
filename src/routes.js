const express = require('express');
const routes = express.Router();

// req.query = Acessar query params (filtros)
// req.params = Acessar route params (edição, delete)
// req.body = Acessar corpo da requisição (criação, edição)

routes.get('/', (req, res)=>{
    return res.send("ok");
});

module.exports = routes;
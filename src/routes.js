const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')

const routes = express.Router();
const upload = multer(uploadConfig);

// req.query = Acessar query params (filtros)
// req.params = Acessar route params (edição, delete)
// req.body = Acessar corpo da requisição (criação, edição)

routes.get('/', (req, res)=>{
    return res.send("welcome");
});

routes.post('/sessions', SessionController.store);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

// ROTA DE USUARIO - EMAIL

module.exports = routes;
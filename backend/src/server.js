const express = require('express'); // biblioteca - dependencia
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb://aamontanher:aamontanher@cluster0-shard-00-00-yludg.mongodb.net:27017,cluster0-shard-00-01-yludg.mongodb.net:27017,cluster0-shard-00-02-yludg.mongodb.net:27017/cc_db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers ={};

//usuarios logados
io.on('connection', socket =>{
    // console.log("user logado", socket.id)
    // console.log(socket.handshake.query);

    //emitir msg para o front
    //socket.emit('hello', 'world')

    //ouvir mensagem do front
    // socket.on('omni', data => {
    //     console.log(data);
    // })

    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.handshake.query;
});

//next segue pro restante do fluxo, se nao para aqui
//deixar disponivel para todas as rotas
app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

//permitir apenas localhost app.use(cors({origin:'http://localhost:3333'}));
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes); // precisa vir depois do express

//escuta http e web socket
server.listen(3333);
//app.listen(3333);
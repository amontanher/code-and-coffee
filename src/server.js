const express = require('express'); // biblioteca - dependencia
const routes = require('./routes');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://aamontanher:aamontanher@cluster0-shard-00-00-yludg.mongodb.net:27017,cluster0-shard-00-01-yludg.mongodb.net:27017,cluster0-shard-00-02-yludg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json());
app.use(routes); // precisa vir depois do express

app.listen(3333);
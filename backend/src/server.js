const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb://rogerbambinetti:rogerbambinetti@cluster-shard-00-00-jmacf.mongodb.net:27017,cluster-shard-00-01-jmacf.mongodb.net:27017,cluster-shard-00-02-jmacf.mongodb.net:27017/tindev?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(3333);
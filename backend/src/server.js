const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

const routes = require('./routes');

mongoose.connect('mongodb://rogerbambinetti:rogerbambinetti@cluster-shard-00-00-jmacf.mongodb.net:27017,cluster-shard-00-01-jmacf.mongodb.net:27017,cluster-shard-00-02-jmacf.mongodb.net:27017/tindev?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser: true});

server.use(express.json());

server.use(cors());

server.use(routes);

server.listen(3333);
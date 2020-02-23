const express = require('express');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

//list devs
routes.get('/devs',DevController.index);
//create dev
routes.post('/devs',DevController.store);
//like dev
routes.post('/devs/:devId/likes',LikeController.store);
//dislike dev
routes.post('/devs/:devId/dislikes',DislikeController.store);

module.exports = routes;
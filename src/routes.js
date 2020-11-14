const express = require('express');
const routes = express.Router();

const leadsController = require('./controllers/controllerLeads');

routes.post('/leads', leadsController.catch);


module.exports = routes;
// admin.route.js
const express = require('express');
const route = express.Router();
const demandeController = require('../controllers/adminDemande.controller');
const GuardAuth = require('./guardAuth');

route.get('/admin/demandedevis',  GuardAuth.isAuth,GuardAuth.isAdmin, demandeController.getAllDemandesController);

route.post('/contact',GuardAuth.isAuth,GuardAuth.isUser,contactController.getContactController)

module.exports = route;

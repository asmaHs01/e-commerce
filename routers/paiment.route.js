const route=require('express').Router()
const PaimentController=require('../controllers/paiment.controller')
const GardAuth = require('./guardAuth');


route.get('/paiment',GardAuth.isAuth,GardAuth.isUser,PaimentController.getPagePaiment)

module.exports=route
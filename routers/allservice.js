const serviceController=require('../controllers/service.controller')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')

router.get('/services',GuardAuth.isAuth,serviceController.getAllServices)

module.exports=router
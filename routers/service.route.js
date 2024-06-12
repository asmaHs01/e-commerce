const serviceController=require('../controllers/service.controller')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')


router.get('/',serviceController.getAllServicesController)

router.get('/services/:id',GuardAuth.isAuth,serviceController.getOneServiceDetailsController);




module.exports=router
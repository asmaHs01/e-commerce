const router=require('express').Router()
const AboutController=require('../controllers/about.controller')

router.get('/about',AboutController.getPageAbout)

module.exports=router
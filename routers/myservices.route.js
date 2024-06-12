const router=require('express').Router()
const serviceController=require('../controllers/service.controller')
const GuardAuth=require('./guardAuth')
const multer=require('multer')


router.get('/',GuardAuth.isAuth,GuardAuth.isAdmin,serviceController.getMyServicesPage)

router.get('/admin/addcategorie',GuardAuth.isAuth,GuardAuth.isAdmin,serviceController.getAddServiceController)
router.post('/',multer({
storage:multer.diskStorage({
    destination:function (req, file, cb) {
            cb(null, 'assets/uploads')  
      },
    filename:function (req, file, cb) {
            cb(null, Date.now()+'-'+ file.originalname )      
    }
})
}).single('image'),
GuardAuth.isAuth,GuardAuth.isAdmin,serviceController.postAddServiceController)



router.get('/update/:id',GuardAuth.isAuth,GuardAuth.isAdmin,serviceController.getMyserviceUpdatePage)

router.post('/update', multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {  
          cb(null, 'assets/uploads')          
          },
        filename:function (req, file, cb) { 
                cb(null, Date.now()+'-'+ file.originalname )  
        }
    })
    }).single('image'),GuardAuth.isAuth,GuardAuth.isAdmin,serviceController.postUpdateServiceController)

router.post('/delete/:id',GuardAuth.isAuth,GuardAuth.isAdmin,serviceController.deleteServiceController)

module.exports=router
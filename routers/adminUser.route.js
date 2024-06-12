const adminUserController=require('../controllers/adminUser.controller')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')

router.get('/admin/tableusers',GuardAuth.isAuth,GuardAuth.isAdmin,adminUserController.getAllUsersController)

router.get('/admin/userdetails/:userId',GuardAuth.isAuth,GuardAuth.isAdmin,adminUserController.getOneUserDetailsController)
router.post('/admin/userdetails/delete/:id',GuardAuth.isAuth,GuardAuth.isAdmin,adminUserController.deleteUserController);

router.get('/admin/addusers',GuardAuth.isAuth,GuardAuth.isAdmin,adminUserController.getAddUserController);
router.post('/admin/addusers',GuardAuth.isAuth,GuardAuth.isAdmin,adminUserController.postAddUserController);



router.post('/admin/updateUserRole/:userId',GuardAuth.isAuth,GuardAuth.isAdmin,adminUserController.updateUserRoleController);


module.exports=router
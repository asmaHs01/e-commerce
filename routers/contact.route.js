const router = require('express').Router();
const GuardAuth=require('./guardAuth')
const contactController = require('../controllers/contact.controller');

router.get('/contact',GuardAuth.isAuth,GuardAuth.isUser,contactController.getContactController)

router.get('/admin/updatecontact',GuardAuth.isAuth,GuardAuth.isAdmin,contactController.getUpdateContactController);
router.post('/admin/updatecontact/:contactId',GuardAuth.isAuth,GuardAuth.isAdmin,contactController.postUpdateContactController);

module.exports = router;
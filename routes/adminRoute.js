const express = require('express')

const adminRoute = express.Router()
//Controller
const adminController = require("../controller/adminController")


// Import verifiedAdmin from the controller

//Admin Login
adminRoute.post('/login', adminController.adminlogin)
// adminRoute.post('/forms', adminController.verifiedAdmin, adminController.saveForm);
 adminRoute.post('/forms', adminController.saveForm);
 adminRoute.post('/forms/:id/publish', adminController.publishForm);
 adminRoute.get('/forms/publishforms', adminController.listPublishForms);
 adminRoute.get('/listAllForms', adminController.listForms);
 adminRoute.delete('/deleteForms/:id', adminController.deleteForm);



 //fields route
 adminRoute.post('/fields', adminController.addField);
 adminRoute.get('/listfields', adminController.listFields);
 adminRoute.delete('/deleteField/:id', adminController.deleteField);

 adminRoute.get('/forms/:id', adminController.getFormById);






module.exports = adminRoute
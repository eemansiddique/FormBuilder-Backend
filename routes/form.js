// const express = require('express');
// const router = express.Router();
// const formController = require('../controller/formController');

// // Form routes
// router.post('/forms', formController.createForm);
// router.put('/forms/:formId', formController.editForm);
// router.delete('/forms/:formId', formController.deleteForm);
// router.get('/forms', formController.listForms);

// // Field routes
// router.post('/forms/:formId/fields', formController.addField);
// router.put('/forms/:formId/fields/:fieldId', formController.editField);
// router.delete('/forms/:formId/fields/:fieldId', formController.deleteField);
// router.get('/forms/:formId/fields', formController.listFields);

// module.exports = router;

const express = require('express');
const router = express.Router();
const formController = require('../controller/formController');
const adminController = require("../controller/adminController")


// Form routes
router.put('/forms/:formId', formController.editForm);
router.delete('/forms/:id', formController.deleteForm);
router.get('/forms', formController.listForms);

// Input field routes

router.put('/forms/:formId/fields/:fieldId', formController.editInputField);
router.delete('/forms/:formId/fields/:fieldId', formController.deleteInputField);
router.get('/forms/:formId/fields', formController.listInputFields);

module.exports = router;

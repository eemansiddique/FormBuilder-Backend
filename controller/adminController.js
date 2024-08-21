const Admin = require('../model/admin/admin')
 const Form = require('../model/Form/Form')
 const Field = require('../model/Field/field');
 
// const Expert = require('../model/expert/expert')
// const sendEmail = require('../service/sendEmail')
const { ObjectId } = require('mongodb');


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
//Admin login
const adminlogin = async (req, res) => {
    console.log("inside admin");
    const AdminDetails = await Admin.findOne({ email: req.body.email });
    if (!AdminDetails) {
        return res.status(404).send({
            message: "Admin not Found"
        });
    }

    // Compare passwords using bcrypt.compare
    const passwordMatch = await bcrypt.compare(req.body.password, AdminDetails.password);
    if (!passwordMatch) {
        console.log("Passwords don't match");
        return res.status(401).send({
            message: "Password is Incorrect"
        });
    }

    const token = jwt.sign({ _id: AdminDetails._id }, process.env.JWT_ADMIN_SECRETKEY, { expiresIn: 3600 });
    console.log(token);
    res.status(200).json({ token });
};


const saveForm = async (req, res) => {
    try {
      console.log('Request body:', req.body);
  
      const { title, description, fields, layout, published = false, createdBy } = req.body;
  
      // Validate layout value
      const validLayouts = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'];
      if (!validLayouts.includes(layout)) {
        return res.status(400).json({ message: 'Invalid layout value' });
      }
  
      // Validate fields
      if (!Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: 'Fields must be a non-empty array' });
      }
  
      // Create and save form
      const form = new Form({
        title,
        description,
        fields,
        layout,
        published,
        createdBy,
      });
  
      const savedForm = await form.save();
      res.status(201).json({
        message: 'Form submitted successfully',
        form: savedForm,
      });
    } catch (error) {
      console.error('Error saving form:', {
        message: error.message,
        stack: error.stack,
        requestBody: req.body
      });
      res.status(500).json({
        message: 'Error saving form',
        error: error.message,
      });
    }
  };

  const publishForm = async (req, res) => {
    try {
      const form = await Form.findByIdAndUpdate(
        req.params.id,
        { published: true },
        { new: true }
      );
  
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      res.status(200).json(form);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const listPublishForms = async (req, res) => {
    try {
      // No need to use populate since fields are stored directly
      const forms = await Form.find({ published: true });
      res.status(200).json({
        message: 'Published forms fetched successfully',
        forms
      });
    } catch (error) {
      console.error('Error fetching forms:', error);
      res.status(500).json({
        message: 'Error fetching forms',
        error: error.message
      });
    }
};
  
// const verifiedAdmin = async (req, res , next) => {
//     const token = req.headers['jwt']
//     if(token){
//         next()
//     }else{
//         res.status(500).send({ message: "not authorized" })
//     }
// }

// const verifiedAdmin = async (req, res, next) => {
//     try {
//         // Log the entire request headers to see all incoming headers
//         console.log('Request Headers:', req.headers);

//         // Get token from Authorization header
//         const authHeader = req.headers['authorization'];
//         console.log('Authorization Header:', authHeader);

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             console.log('Authorization Header is missing or incorrect');
//             return res.status(401).json({ message: "Unauthorized: Missing or incorrect JWT token" });
//         }

//         // Extract the token from "Bearer <token>"
//         const token = authHeader.split(' ')[1];
//         console.log('Extracted Token:', token);

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRETKEY);
//         console.log('Decoded Token:', decoded);

//         // Extract admin ID from the decoded payload
//         const adminId = decoded._id;
//         console.log('Admin ID:', adminId);

//         // Check if the admin exists in the database
//         const admin = await Admin.findOne({ _id: new ObjectId(adminId) });
//         console.log('Admin Found:', admin);

//         if (!admin) {
//             console.log('Admin not found in the database');
//             return res.status(401).json({ message: "Unauthorized: Admin not found" });
//         }

//         // Attach the admin to the request object
//         req.admin = admin;
//         console.log('Admin attached to request:', req.admin);

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.error("Error in verifiedAdmin middleware:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };
  
// const verifiedAdmin = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
  
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, 'JWT_ADMIN_SECRETKEY');
//       const admin = await Admin.findById(decoded._id);
      
//       if (!admin) {
//         return res.status(401).json({ message: 'Admin not found' });
//       }
      
//       req.admin = admin; // Attach admin to the request
//       next();
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         return res.status(401).json({ message: 'Token expired, please log in again' });
//       }
//       return res.status(500).json({ message: 'Server error' });
//     }
//   };

//add filed
const addField = async (req, res) => {
    try {
        // Extract field data from the request body
        const {
            label,
            type,
            placeholder,
            required = false,
            options = [],
            minValue,
            maxValue,
            step,
            fieldId,
        } = req.body;
  
        // Validate required fields
        if (!type) {
            return res.status(400).json({ message: 'Field type is required' });
        }
  
        // Create a new field document
        const newField = new Field({
            label,
            type,
            placeholder,
            required,
            options,
            minValue,
            maxValue,
            step,
            fieldId,
        });
  
        // Save the new field to the database
        const savedField = await newField.save();
  
        // Respond with the created field
        res.status(201).json({
            message: 'Field added successfully',
            field: savedField,
        });
    } catch (error) {
        console.error('Error adding field:', error);
        res.status(500).json({
            message: 'Failed to add field',
            error: error.message,
        });
    }
  };
  
  const listFields = async (req, res) => {
    try {
      // Retrieve all fields from the database
      const fields = await Field.find();
  
      // Respond with the list of fields
      res.status(200).json({
        message: 'Fields fetched successfully',
        fields,
      });
    } catch (error) {
      console.error('Error fetching fields:', error);
      res.status(500).json({
        message: 'Failed to fetch fields',
        error: error.message,
      });
    }
  };
  const deleteField = async (req, res) => {
    try {
      const { fieldId } = req.params;
  
      // Find and delete the field by its fieldId
      const deletedField = await Field.findOneAndDelete({ fieldId });
  
      // If no field was found with the given fieldId, return a 404 response
      if (!deletedField) {
        return res.status(404).json({ message: 'Field not found' });
      }
  
      // Return success message and the deleted field
      res.status(200).json({
        message: 'Field deleted successfully',
        field: deletedField,
      });
    } catch (error) {
      console.error('Error deleting field:', error);
      res.status(500).json({
        message: 'Failed to delete field',
        error: error.message,
      });
    }
  };
  
  
  const listForms = async (req, res) => {
    try {
      // Fetch all forms from the database
      const forms = await Form.find();
      
      // Send the forms as a response
      res.status(200).json(forms);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Error retrieving forms', error: error.message });
    }
  };

  const getFormById = async (req, res) => {
    try {
      // Extract the form ID from request parameters
      const { id } = req.params;
  
      // Find the form by its ID
      const form = await Form.findById(id);
  
      // Check if the form exists
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      // Send the form data as a response
      res.status(200).json(form);
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message });
    }
  };
  const deleteForm = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the form by its ID
      const deletedForm = await Form.findByIdAndDelete(id);
  
      // If no form was found with the given ID, return a 404 response
      if (!deletedForm) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      // Return success message and the deleted form
      res.status(200).json({
        message: 'Form deleted successfully',
        form: deletedForm,
      });
    } catch (error) {
      console.error('Error deleting form:', {
        message: error.message,
        stack: error.stack,
        formId: req.params.id,
      });
      res.status(500).json({
        message: 'Error deleting form',
        error: error.message,
      });
    }
  };
  
  
  


module.exports = {
    adminlogin,
    saveForm,
    publishForm,
    listPublishForms,
    addField,
    listFields,
    listForms,
    getFormById,
    deleteForm,
    deleteField
    //  verifiedAdmin,
}
// const mongoose = require('mongoose');
// const Field =require('../Field/field')

// // Define the enum for layout options
// const layoutEnum = {
//   values: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'],
//   message: '{VALUE} is not a valid layout',
// };

// const formSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field' }], // Reference to field objects
//   layout: { type: String, enum: layoutEnum, required: true }, // Enum for layout with labels
//   published: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
// });

// const Form = mongoose.model('Form', formSchema);

// module.exports = Form;

const mongoose = require('mongoose');
const Field = require('../Field/field');

// Define the enum for layout options
const layoutEnum = {
  values: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'],
  message: '{VALUE} is not a valid layout',
};

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fields: [{ 
    type: { type: String }, 
    name: { type: String }, 
    placeholder: { type: String },
    options: [String], // If you use select fields
    required: { type: Boolean, default: false } // Add any additional field properties
  }],
  layout: { 
    type: String, 
    enum: layoutEnum, 
    required: true, 
    default: 'label1' // Set default layout value to 'label1'
  },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;

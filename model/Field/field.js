const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: false }, // Optional field
  type: { type: String, required: true }, // Required field
  placeholder: { type: String, required: false }, // Optional field
  required: { type: Boolean, default: false }, // Default value
  options: { type: [String], default: [] }, // Default to empty array
  minValue: { type: Number, required: false }, // Optional field
  maxValue: { type: Number, required: false }, // Optional field
  step: { type: Number, required: false }, // Optional field
  fieldId: { type: String, required: false } // Optional field
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;

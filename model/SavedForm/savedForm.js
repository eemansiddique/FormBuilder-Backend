const mongoose = require('mongoose');
const SavedForm=require('../Form/Form')

const savedFormSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  data: { type: Map, of: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const SavedForm = mongoose.model('SavedForm', savedFormSchema);

module.exports = SavedForm;
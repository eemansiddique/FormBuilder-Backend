const Form = require('../model/Form/Form');
const Field =require('../model/Field/field')




// Edit a form
exports.editForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.formId, req.body, { new: true });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a form
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List all forms
exports.listForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Add a new input field to a form
exports.addInputField = async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const { label, type, required } = req.body;
    form.fields.push({ label, type, required });

    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an input field from a form
exports.deleteInputField = async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.fields.id(req.params.fieldId).remove();
    await form.save();

    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit an input field within a form
exports.editInputField = async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const field = form.fields.id(req.params.fieldId);

    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }

    field.label = req.body.label || field.label;
    field.type = req.body.type || field.type;
    field.required = req.body.required !== undefined ? req.body.required : field.required;

    await form.save();
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List input fields of a specific form
exports.listInputFields = async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form.fields);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

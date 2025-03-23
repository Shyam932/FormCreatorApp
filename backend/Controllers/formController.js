const Form = require('../models/FormModel');

const getForms = async (req, res) => {
  try {
    const forms = await Form.find().select('title');
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching forms' });
  }
};

const createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating form' });
  }
};

const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Form not found' });
  }
};

const updateForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating form' });
  }
};

const deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
      
    }
    console.log("Form not found");
    res.json({ message: 'Form deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting form' });
  }
};

module.exports = { getForms, createForm, getFormById, updateForm, deleteForm };
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: String,
  fields: [
    {
      type: { type: String },
      title: String,
      placeholder: String,
    },
  ],
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form; 
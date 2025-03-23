const express = require('express');
const { getForms, createForm, getFormById, updateForm, deleteForm } = require('../controllers/formController');

const router = express.Router();

router.get('/forms', getForms);
router.post('/form/create', createForm);
router.get('/form/:id', getFormById);
router.put('/form/:id/edit', updateForm);
router.delete('/form/:id', deleteForm);


module.exports = router;
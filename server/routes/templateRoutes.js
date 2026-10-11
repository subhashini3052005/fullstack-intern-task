const express = require('express');
const Template = require('../models/Template');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const templates = await Template.find().sort({ name: 1 });
    res.json(templates);
  } catch (error) {
    console.error('Fetch templates error:', error.message);
    res.status(500).json({
      message: 'Unable to fetch templates.',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid template ID.',
      });
    }

    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: 'Template not found.',
      });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch template.',
    });
  }
});

module.exports = router;

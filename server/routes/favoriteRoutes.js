
const express = require('express');
const mongoose = require('mongoose');
const Favorite = require('../models/Favorite');
const Template = require('../models/Template');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.userId,
    }).populate('template');

    res.json(favorites);
  } catch (error) {
    console.error('Fetch favorites error:', error.message);
    res.status(500).json({
      message: 'Unable to fetch favorites.',
    });
  }
});


router.post('/:templateId', authMiddleware, async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!mongoose.isValidObjectId(templateId)) {
      return res.status(400).json({
        message: 'Invalid template ID.',
      });
    }

    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({
        message: 'Template not found.',
      });
    }

    const favorite = await Favorite.findOneAndUpdate(
      { user: req.userId, template: templateId },
      { user: req.userId, template: templateId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: 'Template added to favorites.',
      favorite,
    });
  } catch (error) {
    console.error('Add favorite error:', error.message);
    res.status(500).json({
      message: 'Unable to add favorite.',
    });
  }
});


router.delete('/:templateId', authMiddleware, async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!mongoose.isValidObjectId(templateId)) {
      return res.status(400).json({
        message: 'Invalid template ID.',
      });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: req.userId,
      template: templateId,
    });

    if (!favorite) {
      return res.status(404).json({
        message: 'Favorite not found.',
      });
    }

    res.json({
      message: 'Template removed from favorites.',
    });
  } catch (error) {
    console.error('Remove favorite error:', error.message);
    res.status(500).json({
      message: 'Unable to remove favorite.',
    });
  }
});

module.exports = router;

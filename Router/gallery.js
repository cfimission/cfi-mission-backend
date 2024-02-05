// galleryRouter.js
import express from 'express';
import Gallery from '../models/galleryModel.js'; // Update the path accordingly

const router = express.Router();

// Create a new gallery
router.post('/', async (req, res) => {
  try {
    const gallery = await Gallery.create(req.body);
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all galleries
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific gallery by ID
router.get('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a gallery by ID
router.put('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a gallery by ID
router.delete('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

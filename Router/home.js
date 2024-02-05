import express from 'express';
import Home from '../models/homeModel.js';

const router = express.Router();

// Create a new Home
router.post('/', async (req, res) => {
  try {
    const home = new Home(req.body);
    await home.save();
    res.status(201).json(home);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Homes
router.get('/', async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Home by ID
router.get('/:id', async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific Home by ID
router.put('/:id', async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.status(200).json(home);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific Home by ID
router.delete('/:id', async (req, res) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.id);
    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

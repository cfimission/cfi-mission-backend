import express from 'express';
import Home from '../models/homeModel.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const home = new Home(req.body);
    await home.save();
    res.status(201).json(home);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const homes = await Home.find();
    const currentDate = new Date();

    const bannerImage = homes[0].ImageUrls[0];
    const recentImages = homes[0].ImageUrls.slice(1);

    let verces;
    const homeDocument = await Home.findOne({}); // Find the first document

    if (currentDate.toDateString() === homeDocument.date.toDateString()) {
      verces = homeDocument.verces[homeDocument.counter];
    } else {
      const updatedDocument = await Home.findOneAndUpdate(
        {},
        {
          $set: { date: currentDate },
          $inc: { counter: 1 },
        },
        { new: true }
      );

      const updatedCounter = updatedDocument.counter;
      verces = updatedDocument.verces[updatedCounter];
    }

    res.status(200).json({
      bannerImage: bannerImage,
      recentImages: recentImages,
      verces: verces,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Homes for admin
router.get('/admin', async (req, res) => {
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

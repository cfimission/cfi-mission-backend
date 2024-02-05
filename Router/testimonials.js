import express from "express";
import Testimonials from "../models/testimonials.js";

const router = express.Router();

// Create a new testimonial
router.post("/", async (req, res) => {
  try {
    const { title, description, ImageUrls } = req.body;
    const newTestimonial = new Testimonials({
      title,
      description,
      ImageUrls,
    });
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonials.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a specific testimonial by ID
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonials.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a testimonial by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, videoUrls } = req.body;
    const updatedTestimonial = await Testimonials.findByIdAndUpdate(
      req.params.id,
      { title, description, videoUrls },
      { new: true }
    );
    
    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a testimonial by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTestimonial = await Testimonials.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

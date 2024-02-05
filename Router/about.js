import express from "express";
import AboutModel from "../models/aboutModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, ImageUrls, dayabout, day, category } = req.body;
    const newDocument = new AboutModel({
      title,
      description,
      ImageUrls,
      dayabout,
      day,
      category,
    });
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {

    const category = req.query.category;
    const documents = await AboutModel.find({category});

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/admin", async (req, res) => {
  try {
    const documents = await AboutModel.find();
    console.log(documents)
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const document = await AboutModel.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, ImageUrls, dayabout, day, category } = req.body;
    const updatedDocument = await AboutModel.findByIdAndUpdate(
      req.params.id,
      { title, description, ImageUrls, dayabout, day, category },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedDocument = await AboutModel.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

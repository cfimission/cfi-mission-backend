import express from "express";
import Contact from "../models/contactModel.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const newContact = new Contact({ name, phoneNumber });
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

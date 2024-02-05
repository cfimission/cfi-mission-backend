import mongoose from "mongoose";

const galleryModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ImageUrls: {
    type: [String], 
    required: true
  },
});

const Gallery = mongoose.model('Gallery', galleryModelSchema);
export default Gallery;

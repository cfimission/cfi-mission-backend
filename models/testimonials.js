import mongoose from "mongoose";

const testimonialsModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrls:{
    type: [String], 
    required: true
  },
});

const Testimonials = mongoose.model('Testimonials', testimonialsModelSchema);
export default Testimonials;

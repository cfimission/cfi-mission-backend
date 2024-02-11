import mongoose from "mongoose";

const validCategories = ["Suresh_Kumar","Cfi_Mission"]; 

const aboutModelSchema = new mongoose.Schema({
  sno:{
    type:Number,
    required:true
  },
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
  dayabout: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: validCategories
  }
});

const AboutModel = mongoose.model('About', aboutModelSchema);
export default AboutModel;

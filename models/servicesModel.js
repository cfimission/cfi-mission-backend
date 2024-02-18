import mongoose from "mongoose";
const validCategories = ["Weekly","Monthly","Other"]; 


const servicesModelSchema = new mongoose.Schema({
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
  logo:{
    type:String,
    required:true
  },
  category: {
    type: String,
    required: true,
    enum: validCategories
  }
});

const ServicesModel = mongoose.model('Services', servicesModelSchema);
export default ServicesModel;

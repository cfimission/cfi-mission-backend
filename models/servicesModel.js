import mongoose from "mongoose";


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
});

const ServicesModel = mongoose.model('Services', servicesModelSchema);
export default ServicesModel;

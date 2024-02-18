import mongoose from "mongoose";

const contactModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  Address:{
    type:String,
  },
  message:{
    type:String,
  }
});

const Contact = mongoose.model('Contact', contactModelSchema);
export default Contact;

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
  }
});

const Contact = mongoose.model('Contact', contactModelSchema);
export default Contact;

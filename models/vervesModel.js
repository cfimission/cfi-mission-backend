import mongoose from "mongoose";

const vercesModelSchema = new mongoose.Schema({
  verces: {
    type: [String],
  },
});

const verces = mongoose.model('Home', vercesModelSchema);
export default verces;

import mongoose from "mongoose";

const homeModelSchema = new mongoose.Schema({
  ImageUrls: {
    type: [String],
    validate: {
      validator: function (array) {
        return array.length <= 7;
      },
      message: props => `${props.path} exceeds the limit of 5 images.`
    },
  },
  verces: {
    type: [String],
  },
  counter:{
    type:Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Home = mongoose.model('Home', homeModelSchema);
export default Home;

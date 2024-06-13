import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  applicationNumber: {
    type: String,
    required: true,
  },
  allIndiaRank: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
const mongoDBConnect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/", {});
    console.log("MongoDB - Connected");
  } catch (error) {
    console.log("Error - MongoDB Connection " + error);
  }
};
export default mongoDBConnect;

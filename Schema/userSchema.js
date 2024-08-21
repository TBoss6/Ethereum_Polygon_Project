import mongoose from "mongoose";
const schema = mongoose.Schema;

const newUserDetailsSchema = new mongoose.Schema({
  UserName: {
    type: String,
    // require: true,
  },
  password: {
    type: String,
    // require: true,
  },
  walletAddress: {
    type: String,
    // require: true,
  },
  privateKey: {
    type: String,
    // required: true,
  },
});

const newUserDetails = mongoose.model("newUserDatails", newUserDetailsSchema);
export default newUserDetails;

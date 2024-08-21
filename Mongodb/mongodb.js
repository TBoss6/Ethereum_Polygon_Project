import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodb_Url = process.env.mongodb_Url;
export const Mongodb = async () => {
  try {
    await mongoose.connect(mongodb_Url);
    console.log("========Database Connected Successfully========");
  } catch (error) {
    console.log(error);
  }
};

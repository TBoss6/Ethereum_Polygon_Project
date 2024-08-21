import express from "express";
import { Mongodb } from "./Mongodb/mongodb.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import balance from "./router/post.js";
import { mongo } from "mongoose";
const port = process.env.PORT;
// Body Parser middleware
app.use(express.json());
// Routes
app.use(balance);
// app.get("/balance/:chain/:walletAddress/", getUserBalance);

app.listen(port, () => {
  Mongodb();
  console.log(`========Web3 Server running on port ${port}========`);
});

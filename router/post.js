import express from "express";
import {
  getUserBalance,
  greeting,
  getUserHistory,
  createNewWalletAddress,
} from "../controller/postController.js";
export const router = express.Router();

// To Get wallet balance
// router.get("balance/:chain/",/:walletaddress/", getUserBalance);
router.route("/balance/:chain/:walletAddress").get(getUserBalance);
router.route("/userHistory/:chain/:walletAddress").get(getUserHistory);
router.route("/createNewWallet").post(createNewWalletAddress);
router.route("/").get(greeting);

export default router;

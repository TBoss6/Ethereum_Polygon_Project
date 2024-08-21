import { ethers, formatEther } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { response } from "express";
import newUserDetails from "../Schema/userSchema.js";

const EthAPIKEY = process.env.Ethereum_API_Key;
const PolygonAPIKEY = process.env.Polygon_API_key;

const CHAINS = {
  ETH: "ethereum",
  POLYGON: "polygon",
};

const jsonRPC = {
  ethereum: "https://mainnet.gateway.tenderly.co",
  polygon: "https://polygon.meowrpc.com",
};

// General Greeting from TBOSS to incoming user
export const greeting = (req, res) => {
  console.log("Hello! \nGood to have you here Champ");
  return res.status(200).json({
    message: "Welcome to this blockchain",
    response: "Welcome On Board!",
  });
};

// FETCHING ETHEREUM OR POLYGON BALANCE
export const getUserBalance = async (req, res) => {
  try {
    // let ethereumProvider;
    const chain = req.params.chain;
    console.log(chain);
    const userWalletAddress = req.params.walletAddress;
    console.log("This is the entered wallet address", userWalletAddress);

    // if (ethers.isAddress(userWalletAddress)) {
    //   console.log("Okay... It is a valid Wallet address");
    if (chain === CHAINS.ETH) {
      let ethereumProvider = new ethers.JsonRpcProvider(jsonRPC.ethereum);
      const ethBalance = await ethereumProvider.getBalance(userWalletAddress);
      console.log(`Balance Fetched for ${chain} =`, ethBalance);
      const convertedEthBalance = Number(formatEther(ethBalance)).toFixed(3);

      console.log(`Converted ${chain} Balance = ${convertedEthBalance}`);
      return res.status(200).json({
        Message: "fetch Balance successful",
        response: convertedEthBalance,
      });
    } else if (chain === CHAINS.POLYGON) {
      let polygonProvider = new ethers.JsonRpcProvider(jsonRPC.polygon);
      console.log("========polygonProvider==============");
      const polygonBalance = await polygonProvider.getBalance(
        userWalletAddress
      );
      console.log(`Balance Fetched for ${chain} = `, polygonBalance);
      const convertedPolygonBalance = Number(
        formatEther(polygonBalance)
      ).toFixed(3);

      console.log(`Converted ${chain} Balance = ${convertedPolygonBalance}`);
      return res.status(200).json({
        Message: "fetch Balance successful",
        response: convertedPolygonBalance,
      });
    } else {
      console.log("Wrong chain!, it has to be either ETHEREUM or POLYGON");
    }
    // } else {
    //   console.log("The wallet address cannot be found");
    //   return res.status(409).json({
    //     message: "Something went wrong",
    //     response: "Not a valid address",
    //   });
    // }
  } catch (error) {
    console.log(error, "Couldn't fetch data");
    return res.status(500).json({
      message: "Something went wrong",
      response: "Error occured while fetching data",
    });
  }
};

// To get user Wallet History on Ethereum and Polygon
export const getUserHistory = async (req, res) => {
  try {
    const chain = req.params.chain;
    console.log(chain);
    const userWalletAddress = req.params.walletAddress;
    console.log("This is the entered wallet address", userWalletAddress);
    if (chain === CHAINS.ETH) {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${userWalletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${EthAPIKEY}`;
      const ethereumWalletHistory = await axios.get(url);
      console.log(
        "======This is the wallet history for Ethereum======",
        ethereumWalletHistory.data.result
      );
      res.status(200).json({
        message: "History for Ethereum Fetched",
        response: ethereumWalletHistory.data.result,
      });
    } else if (chain === CHAINS.POLYGON) {
      const url = `https://api.polygonscan.com/api?module=account&action=txlist&address=${userWalletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${PolygonAPIKEY}`;
      const polygonWalletHistory = await axios.get(url);
      console.log(
        "=======This is the wallet History for Polygon======",
        polygonWalletHistory.data.result
      );
      res.status(200).json({
        message: "History Fetched",
        response: polygonWalletHistory.data.result,
      });
    }
  } catch (error) {
    console.log(error, "Couldn't fetch History data");
    res.status(500).json({
      message: "Something went wrong",
      response: "Error occured while fetching history data",
    });
  }
};

// To create a random Wallet Address with a private key
// export const createNewWalletAddress = createWalletAddress
export const createNewWalletAddress = async (req, res) => {
  try {
    const { UserName, password } = req.body;
    const newUserWallet = await ethers.Wallet.createRandom();
    console.log(newUserWallet.address);
    console.log(newUserWallet.privateKey);

    const newUser = new newUserDetails({
      UserName,
      password,
      walletAddress: newUserWallet.address,
      privateKey: newUserWallet.privateKey,
    });
    await newUser.save();
    console.log(newUser);

    res.status(201).json({
      message: "Wallet address created successfully!",
      response: newUser,
    });
  } catch (error) {
    console.log("Unable to create wallet");
    console.log(error);
  }
};

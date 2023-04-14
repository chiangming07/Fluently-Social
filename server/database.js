import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI;
export const db = mongoose
  .connect(uri)
  .then(() => console.log("Connected!"))
  .catch((e) => console.log(e));

// 驗證：schema.pre('save', ...)

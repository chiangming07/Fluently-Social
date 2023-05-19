// export connection to app.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI;
const db = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("Connected!"))
    .catch((e) => console.log(e));
};

export default db;

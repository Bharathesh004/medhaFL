import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerUserToDB from "./controllers/userController.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const mongoUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Allow frontend requests

app.post("/register", registerUserToDB);

app.listen(5088, () => {
  console.log("Listening on port", PORT);
});

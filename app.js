import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routers from "./routes/routers.js";
import mongoose from "mongoose";
import initialChallenges from "./helpers/InitialDataChallenges.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routers);

const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");
    await initialChallenges();
    app.listen(PORT, console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));

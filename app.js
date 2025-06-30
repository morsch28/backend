import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import quizRoute from "./routes/quizRoute.js";
import challengesRoute from "./routes/challengesRoute.js";
import initialChallenges from "./helpers/InitialDataChallenges.js";

const app = express();
app.use(express.json());

app.use("/users", authRoute);
app.use("/challenges", challengesRoute);
app.use("/quiz", quizRoute);

const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");
    await initialChallenges();
    app.listen(PORT, console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));

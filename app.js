import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoute.js";

const app = express();
app.use(express.json());

app.use("/users", loginRoute);
app.use("/users", userRoutes);

const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));

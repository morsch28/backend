import express from "express";
import { User, loginValidation } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//login
router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid Email or Password");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).send("Invalid Password");
    }
    const token = jwt.sign(
      {
        _id: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

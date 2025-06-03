import express from "express";
import bcrypt from "bcrypt";
import { User, userValidation } from "../model/user.js";
import { authMdw } from "../middleWare/authMdw.js";

const router = express.Router();

//create-user
router.post("/", async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user = await new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 14),
    }).save();

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get user by id
router.get("/:id", authMdw, async (req, res) => {
  try {
    if (req.user._id !== req.params.id && !req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

//update user
router.put("/:id", authMdw, async (req, res) => {
  try {
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    if (req.user._id != req.params.id && !req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }

    const userToUpdate = await User.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!userToUpdate) {
      return res.status(404).send("Not found");
    }
    res.send(userToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete user
router.delete("/:id", authMdw, async (req, res) => {
  try {
    if (req.user._id !== req.params.id && !req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }

    const userToDelete = await User.findByIdAndDelete(req.params.id);
    if (!userToDelete) {
      res.status(400).send("Not found");
    }
    res.send(userToDelete);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//like bio of other users share interests
router.post("like/userId", authMdw, (req, res) => {});

//get all online users that shares interest
router.get("/isOnline/:match", authMdw, async (req, res) => {
  const user = await User.find(req.user._id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const allMatchUsers = await User.find({
    isOnline: true,
    interests: { $in: user.interests },
    _id: { $ne: user._id },
  });

  const filterUsers = allMatchUsers.map((currUser) => ({
    image: user.image,
    name: currUser.name,
    age: currUser.age,
    interests: user.interests,
    bio: user.bio,
  }));

  res.send(filterUsers);

  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

// like user bio
router.port;

export default router;

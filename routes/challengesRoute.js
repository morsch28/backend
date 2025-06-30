import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import { Challenge, challengeValidation } from "../model/challenge.js";
import {
  UserChallenge,
  userChallengeValidation,
} from "../model/userChallenge.js";

const router = express.Router();

//create a new challenge (only admin)
router.post("/", authMdw, async (req, res) => {
  try {
    const { error } = challengeValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (!req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }

    const newChallenge = new Challenge(req.body);
    await newChallenge.save();
    res.status(201).send(newChallenge);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all challenges
router.get("/", authMdw, async (req, res) => {
  try {
    const allChallenges = await Challenge.find();
    if (!allChallenges) {
      return res.status(404).send("Not Found challenge");
    }
    res.status(200).send(allChallenges);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all challenges that user select to do
router.get("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id !== req.params.id) {
      return res.status(401).send("Access denied");
    }

    const challengesOfUser = await UserChallenge.find({
      userId: req.params.id,
    });
    if (!challengesOfUser) {
      return res.status(404).send("Not Found");
    }

    res.send(challengesOfUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//information about a status of specific user challenge
router.get("/status/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id != req.params.id) {
      res.status(403).send("Access denied");
    }

    const challengeStatus = await UserChallenge.findById(req.params.id);
    if (!challengeStatus) {
      res.status(404).send("Not Found");
    }

    res.send({ status: challengeStatus.status });
  } catch (error) {
    console.log(error);
  }
});

//add an exist challenge to the list of user's challenges
// router.post("/:id", authMdw, async (req, res) => {});

//update user personal challenge(status,feedback,image)
router.put("/:id", authMdw, async (req, res) => {
  try {
    const { error } = userChallengeValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const challenge = await UserChallenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).send("Not found");
    }

    if (String(challenge.userId) !== req.user._id) {
      return res.status(401).send("Access denied");
    }
    const challengeToUpdate = await UserChallenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(challengeToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete user personal challenge
router.delete("/:id", authMdw, async (req, res) => {
  try {
    const challenge = await UserChallenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).send("Not found");
    }

    if (String(challenge.userId) != req.user._id) {
      return res.status(401).send("Access denied");
    }

    const challengeToUDelete = await UserChallenge.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(challengeToUDelete);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// //the all challenges of all users with done status
// router.get("/community", authMdw, async (req, res) => {});

export default router;

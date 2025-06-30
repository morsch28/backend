import mongoose from "mongoose";
import Joi from "joi";

const challengeSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["fitness", "nutrition", "mental"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  duration_days: {
    type: Number,
  },
  benefits: {
    type: [String],
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema, "challenge");

const challengeValidation = Joi.object({
  category: Joi.string().valid("fitness", "nutrition", "mental").required(),
  difficulty: Joi.string().valid("easy", "medium", "hard").required(),
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  duration_days: Joi.number().min(1).integer().required(),
  benefits: Joi.array().items(Joi.string().min(2)).required(),
});

export { Challenge, challengeValidation };

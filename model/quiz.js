import { required } from "joi";
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["sport", "travel", "nutrition"],
    required,
  },
  question: {
    type: String,
    required,
  },
  answers: {
    type: [String],
    required,
  },
  correctAnswer: {
    type: Number,
    required,
  },
});

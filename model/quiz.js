import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["sport", "travel", "nutrition"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema, "quiz");

export default Quiz;

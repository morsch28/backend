import mongoose from "mongoose";
import Joi from "joi";

const workoutValidation = new mongoose.Schema({
  typeOfTraining: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },
  trainingProgram: {
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
  },
  timesPerWeek: {
    type: Number,
    min: 1,
    max: 7,
    required: true,
  },
});

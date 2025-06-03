import Joi from "joi";
import mongoose from "mongoose";

const workoutPreferencesSchema = new mongoose.Schema({
  typeOfTraining: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  timesPerWeek: {
    type: Number,
    min: 1,
    max: 7,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WorkoutPreferences = mongoose.model(
  "WorkoutPreferences",
  workoutPreferencesSchema,
  "workoutPreferences"
);

const validation = {
  typeOfTraining: Joi.string().min(2).max(256).required(),
  level: Joi.string().valid("beginner", "intermediate", "advanced").required(),
  timesPerWeek: Joi.number().min(1).max(7).required(),
};

const workoutPrefer = Joi.object(validation);

export { WorkoutPreferences, workoutPrefer };

import mongoose from "mongoose";
import Joi from "joi";

const workoutSchema = new mongoose.Schema({
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
    timesPerWeek: {
      type: Number,
      min: 1,
      max: 7,
      required: true,
    },
  },
  exercises: [
    {
      imageUrl: {
        type: String,
        minlength: 14,
        default: "",
      },
      videoUrl: {
        type: String,
        minlength: 14,
        default: "",
      },
      description: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        default: "",
      },
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Workouts = mongoose.model("Workouts", workoutSchema, "workouts");

const workoutsValidation = Joi.object({
  typeOfTraining: Joi.string().min(2).max(256).required(),
  trainingProgram: Joi.object({
    level: Joi.string()
      .valid("beginner", "intermediate", "advanced")
      .required(),
    timesPerWeek: Joi.number().min(1).max(7).required(),
  }).required(),
  exercises: Joi.array()
    .items(
      Joi.object({
        imageUrl: Joi.string().min(14).allow(""),
        videoUrl: Joi.string().min(14).allow(""),
        description: Joi.string().min(2).allow(""),
      })
    )
    .required(),
});

export { Workouts, workoutsValidation };

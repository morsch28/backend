import mongoose from "mongoose";
import Joi from "joi";

const nutritionSchema = new mongoose.Schema({
  tips: {
    type: String,
    minlength: 2,
    default: "",
  },
  articles: [
    {
      title: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: false,
      },
      description: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: false,
      },
      content: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        required: false,
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

const Nutrition = mongoose.model("Nutrition", nutritionSchema, "nutrition");

const nutritionValidation = Joi.object({
  tips: Joi.string().min(2).allow(""),
  articles: Joi.array().items(
    Joi.object({
      title: Joi.string().min(2).max(1024).allow(""),
      description: Joi.string().min(2).max(1024).allow(""),
      content: Joi.string().min(2).max(1024).allow(""),
    })
  ),
});

const exportNutrition = {
  Nutrition,
  nutritionValidation,
};

export default exportNutrition;

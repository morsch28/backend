import mongoose from "mongoose";
import Joi from "joi";

const travelSchema = new mongoose.Schema({
  recommendations: {
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
        default: "",
      },
      description: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        default: "",
      },
      healthyBenefit: {
        type: String,
        minlength: 2,
        maxlength: 1024,
        default: "",
      },
      content: {
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

const Travel = mongoose.model("Travel", travelSchema, "travels");

const travelValidation = Joi.object({
  recommendations: Joi.string().allow(""),
  articles: Joi.array().items(
    Joi.object({
      title: Joi.string().min(2).max(1024).allow(""),
      description: Joi.string().min(2).max(1024).allow(""),
      healthyBenefit: Joi.string().min(2).max(1024).allow(""),
      content: Joi.string().min(2).max(1024).allow(""),
    })
  ),
});

export { Travel, travelValidation };

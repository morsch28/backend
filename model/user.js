import mongoose from "mongoose";
import Joi from "joi";
import _ from "lodash";

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    last: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  image: {
    url: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
  address: {
    state: {
      type: String,
      minlength: 2,
      maxlength: 256,
    },
    country: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    street: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    houseNumber: {
      type: Number,
      min: 1,
      required: true,
    },
    zip: {
      type: Number,
      min: 2,
    },
  },
  age: {
    type: Number,
    min: 2,
    max: 120,
    required: true,
  },
  interests: {
    type: [String],
    enum: ["workout", "healthy nutrition", "travel"],
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  likesBioUser: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema, "users");

const validation = {
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256),
    last: Joi.string().min(2).max(256).required(),
  }).required(),
  email: Joi.string().min(5).max(1024).email({ tlds: true }).required(),
  password: Joi.string().min(8).max(1025).required(),
  image: Joi.object({
    url: Joi.string().min(14).optional().allow(""),
    alt: Joi.string().min(2).max(256).optional().allow(""),
  }).required(),
  address: Joi.object({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().min(2).allow(""),
  }).required(),
  age: Joi.number().min(2).max(120).required(),
  interests: Joi.array()
    .items(Joi.string().valid("workout", "healthy nutrition", "travel"))
    .required(),
  bio: Joi.string().min(2).max(1024).optional().default(""),
  isBusiness: Joi.boolean().required(),
};

const userValidation = Joi.object(validation);
const loginValidation = Joi.object(_.pick(validation, ["email", "password"]));

export { User, userValidation, loginValidation };

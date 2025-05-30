import mongoose from "mongoose";
import joi from "joi";
import _ from "lodash";

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    middle: {
      type: String,
      minlength: 2,
      maxlength: 256,
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
      minlength: 14,
    },
    alt: {
      type: String,
      minlength: 2,
      maxlength: 256,
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
    minlength: 2,
    maxlength: 120,
    required: true,
  },
  interests: {
    type: String,
    enum: ["workout", "healthy nutrition", "travel"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "users");

const validation = {
  name: joi
    .object({
      first: joi.string().min(2).max(256).required(),
      middle: joi.string().min(2).max(256),
      last: joi.string().min(2).max(256).required(),
    })
    .required(),
  email: joi.string().min(5).max(1024).email({ tlds: true }).required(),
  password: joi.string().min(8).max(1025).required(),
  image: joi
    .object({
      url: joi.string().min(14),
      alt: joi.string().min(2).max(256),
    })
    .required(),
  address: joi
    .object({
      state: joi.string().min(2).max(256),
      country: joi.string().min(2).max(256).required(),
      city: joi.string().min(2).max(256).required(),
      street: joi.string().min(2).max(256).required(),
      houseNumber: joi.number().min(1).required(),
      zip: joi.number().min(2),
    })
    .required(),
  age: joi.number().min(2).max(120).required(),
  interests: joi.string().valid("workout", "healthy nutrition", "travel"),
};

const userValidation = joi.object(validation);
const loginValidation = _.pick(validation, ["email", "password"]);

const exportUser = {
  User,
  userValidation,
  loginValidation,
};

export default exportUser;

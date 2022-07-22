const mongoose = require("mongoose");
const Joi = require("joi");

const Member = mongoose.model(
  "Member",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMember(member) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    email: Joi.string().email().min(5).max(255),
    jobTitle: Joi.string().min(5).max(50),
    hourlyRate: Joi.number().min(0).max(255),
  });
  return schema.validate(member);
}

exports.Member = Member;
exports.validate = validateMember;

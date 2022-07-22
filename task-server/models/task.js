const { projectSchema } = require("./project");
const mongoose = require("mongoose");
const Joi = require("joi");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    isAssigned: {
      type: Boolean,
      default: false,
    },
    project: {
      type: projectSchema,
      required: true,
    },
  })
);

function validateTask(task) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255),
    description: Joi.string().min(5).max(255),
    projectId: Joi.objectId(),
    isAssigned: Joi.boolean(),
  });
  return schema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;

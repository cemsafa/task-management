const mongoose = require("mongoose");
const Joi = require("joi");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    description: Joi.string().min(5).max(255),
  });
  return schema.validate(project);
}

exports.Project = Project;
exports.projectSchema = projectSchema;
exports.validate = validateProject;

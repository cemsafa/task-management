const Joi = require("joi");
const moment = require("moment");
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  member: {
    type: new mongoose.Schema({
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
        length: 50,
      },
      hourlyRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  task: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
    }),
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  wage: {
    type: Number,
    min: 0,
  },
});

function lookup(memberId, taskId) {
  return Assignment.findOne({
    "member._id": memberId,
    "task._id": taskId,
  });
}

assignmentSchema.methods.return = function () {
  this.endDate = new Date();
  this.wage = moment().diff(this.startDate, "hours") * this.member.hourlyRate;
};

const Assignment = mongoose.model("Assignment", assignmentSchema);

function validateAssignment(assignment) {
  const schema = Joi.object({
    memberId: Joi.objectId().required(),
    taskId: Joi.objectId().required(),
  });

  return schema.validate(assignment);
}

exports.Assignment = Assignment;
exports.validate = validateAssignment;
exports.lookup = lookup;

const { Assignment, validate } = require("../models/assignment");
const { Task } = require("../models/task");
const { Member } = require("../models/member");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const validator = require("../middleware/validate");
const Fawn = require("fawn");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

Fawn.init("mongodb://127.0.0.1/tasks");

router.get("/", auth, async (req, res) => {
  const assignments = await Assignment.find().sort("-startDate");
  res.send(assignments);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment)
    return res.status(404).send("The assignment with given id was not found.");
  res.send(assignment);
});

router.post("/", [auth, admin, validator(validate)], async (req, res) => {
  const member = await Member.findById(req.body.memberId);
  if (!member) return res.status(400).send("Invalid member.");

  const task = await Task.findById(req.body.taskId);
  if (!task) return res.status(400).send("Invalid task.");

  if (task.isAssigned === true)
    return res.status(400).send("Task already assigned.");

  const assignment = new Assignment({
    member: {
      _id: member._id,
      name: member.name,
      email: member.email,
      jobTitle: member.jobTitle,
      hourlyRate: member.hourlyRate,
    },
    task: {
      _id: task._id,
      name: task.name,
      description: task.description,
    },
  });

  try {
    new Fawn.Task()
      .save("assignments", assignment)
      .update("tasks", { _id: task._id }, { isAssigned: true })
      .run();

    res.send(assignment);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

module.exports = router;

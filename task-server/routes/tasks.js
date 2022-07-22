const { Task, validate } = require("../models/task");
const { Project } = require("../models/project");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validator = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().sort("name");
  res.send(tasks);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).send("The task with given id was not found.");
  res.send(task);
});

router.post("/", [auth, validator(validate)], async (req, res) => {
  const project = await Project.findById(req.body.projectId);
  if (!project) return res.status(400).send("Invalid project.");

  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    project: {
      _id: project._id,
      name: project.name,
      description: project.description,
    },
  });
  await task.save();
  res.send(task);
});

router.put(
  "/:id",
  [auth, validator(validate), validateObjectId],
  async (req, res) => {
    const project = await Project.findById(req.body.projectId);
    if (!project) return res.status(400).send("Invalid project.");

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        project: {
          _id: project._id,
          name: project.name,
          description: project.description,
        },
      },
      { new: true }
    );
    if (!task)
      return res.status(404).send("The task with given id was not found.");

    res.send(task);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task)
    return res.status(404).send("The task with given id was not found.");

  res.send(task);
});

module.exports = router;

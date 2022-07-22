const { Project, validate } = require("../models/project");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validator = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find().sort("name");
  res.send(projects);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res.status(404).send("The project with given id was not found.");
  res.send(project);
});

router.post("/", [auth, validator(validate)], async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
  });
  await project.save();
  res.send(project);
});

router.put(
  "/:id",
  [auth, validator(validate), validateObjectId],
  async (req, res) => {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    if (!project)
      return res.status(404).send("The project with given id was not found.");

    res.send(project);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project)
    return res.status(404).send("The project with given id was not found.");

  res.send(project);
});

module.exports = router;

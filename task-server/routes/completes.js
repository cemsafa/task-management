const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const { lookup } = require("../models/assignment");
const { Task } = require("../models/task");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", [auth, validator(validateReturn)], async (req, res) => {
  const assignment = await lookup(req.body.memberId, req.body.taskId);
  if (!assignment) return res.status(404).send("Assignment not found");

  if (assignment.dateReturned)
    return res.status(400).send("Task already compleated");

  assignment.return();
  await assignment.save();

  return res.send(assignment);
});

function validateReturn(req) {
  const schema = Joi.object({
    memberId: Joi.objectId().required(),
    taskId: Joi.objectId().required(),
  });
  return schema.validate(req);
}

module.exports = router;

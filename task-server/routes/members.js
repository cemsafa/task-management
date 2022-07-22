const { Member, validate } = require("../models/member");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validator = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const members = await Member.find().sort("name");
  res.send(members);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member)
    return res.status(404).send("The member with given id was not found.");
  res.send(member);
});

router.post("/", [auth, validator(validate)], async (req, res) => {
  const member = new Member({
    name: req.body.name,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    hourlyRate: req.body.hourlyRate,
  });
  await member.save();
  res.send(member);
});

router.put(
  "/:id",
  [auth, validator(validate), admin, validateObjectId],
  async (req, res) => {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        hourlyRate: req.body.hourlyRate,
      },
      { new: true }
    );
    if (!member)
      return res.status(404).send("The member with given id was not found.");

    res.send(member);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const member = await Member.findByIdAndRemove(req.params.id);
  if (!member)
    return res.status(404).send("The member with given id was not found.");

  res.send(member);
});

module.exports = router;

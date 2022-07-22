const express = require("express");
const error = require("../middleware/error");
const projects = require("../routes/projects");
const members = require("../routes/members");
const tasks = require("../routes/tasks");
const assignments = require("../routes/assignments");
const users = require("../routes/users");
const auth = require("../routes/auth");
const completes = require("../routes/completes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/projects", projects);
  app.use("/api/members", members);
  app.use("/api/tasks", tasks);
  app.use("/api/assignments", assignments);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/completes", completes);
  app.use(error);
};

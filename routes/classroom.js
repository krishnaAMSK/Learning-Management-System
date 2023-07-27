const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController.js");
const checkRole = require("../middleware/checkRoleMiddleware.js");

// Create a classroom
router.post(
  "/create",
  checkRole(["admin", "teacher"]),
  classroomController.createClassroom
);

// Add a student to a classroom
router.post(
  "/:classroomId/addStudent",
  checkRole(["admin", "teacher"]),
  classroomController.addStudentToClassroom
);

module.exports = router;

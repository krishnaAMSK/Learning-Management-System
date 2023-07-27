const { v4: uuidv4 } = require("uuid");
const prisma = require("../prisma/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

function getUserName(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username;

    return username;
  } catch (error) {
    console.error("Error while extracting username from JWT token:", error);
    return null;
  }
}

// Create a classroom
async function createClassroom(req, res) {
  const teachername = getUserName(req.cookies.auth);
  const { classname } = req.body;

  try {
    const classroom = await prisma.classroom.create({
      data: {
        classname: classname,
        classroomId: uuidv4(),
        teachername: teachername,
        classStrength: 0,
      },
    });

    return res
      .status(201)
      .json({ message: "Classroom created successfully.", classroom });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while creating the classroom." });
  }
}

// Add a student to a classroom
async function addStudentToClassroom(req, res) {
  const classroomId = req.params.classroomId; // change
  const { studentId } = req.body;

  try {
    const classroom = await prisma.classroom.findUnique({
      where: { classroomId: classroomId },
    });

    // Classroom not found
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found." });
    }

    const student = await prisma.user.findUnique({
      where: { username: studentId },
    });

    // Student not found
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Check if student already exists in the classroom

    const studentExists = await prisma.classroomenrollment.findFirst({
      where: {
        classroomId: classroomId,
        studentId: studentId,
      },
    });
    if (studentExists) {
      return res.status(400).json({
        message: "Student already exists in the classroom.",
      });
    }

    const newUser = await prisma.classroomenrollment.create({
      data: {
        newUser,
      },
    });

    // for sending notification to student that he/she has been added to a classroom
    // we can add the notification logic here
    // as of now we dont have that feature so leaving these comments here

    return res.status(200).json({
      message: "Student added to the classroom successfully.",
      classroom: updatedClassroom,
    });
  } catch (error) {
    console.error("Error adding student to classroom:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
  createClassroom,
  addStudentToClassroom,
};

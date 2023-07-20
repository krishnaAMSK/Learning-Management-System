const { v4: uuidv4 } = require("uuid");
const prisma = require('../prisma/db');


// Create a classroom
async function createClassroom(req, res) {
  const { classname, teachername } = req.body;

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
  const { classroomId, studentId } = req.body;

  try {
    const classroom = await prisma.classroom.findUnique({
      where: { id: Number(classroomId) },
      include: { students: true },
    });

    // Classroom not found
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found." });
    }

    const student = await prisma.user.findUnique({
      where: { id: Number(studentId) },
    });

    // Student not found
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Check if student already exists in the classroom

    const studentExists = classroom.students.some((student) => student.id == studentId);

    if (studentExists) {
      return res.status(400).json({
        message: "Student already exists in the classroom.",
      });
    }
    // Add student to the classroom
    const updatedClassroom = await prisma.classroom.update({
      where: { id: Number(classroomId) },
      data: {
        students: {
          connect: { id: Number(studentId) },
        },
        classStrength: classroom.classStrength + 1,
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

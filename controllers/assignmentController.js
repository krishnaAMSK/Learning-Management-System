const { PrismaClient } = require('@prisma/client') ;
const prisma = new PrismaClient() ;


const createAssignment = async (req, res) => {
  const { title, description, deadline } = req.body;
  const teacherId = req.user.id; 

  try {
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        deadline,
        teacher: { connect: { id: teacherId } },
      },
    });

    res.status(200).json({ message: 'Assignment created successfully!', assignment });
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Failed to create assignment.', error });
  }
};


const getAssignmentsForTeacher = async (req, res) => {
  const teacherId = req.user.id; 

  try {
    const assignments = await prisma.assignment.findMany({
      where: { teacherId },
      include: { students: true },
    });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error retrieving assignments for teacher:', error);
    res.status(500).json({ message: 'Failed to retrieve assignments.', error });
  }
};


const getAssignmentsForStudent = async (req, res) => {
  const studentId = req.user.id; 

  try {
    const assignments = await prisma.assignment.findMany({
      where: { students: { some: { id: studentId } } },
      include: { teacher: true },
    });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error retrieving assignments for student:', error);
    res.status(500).json({ message: 'Failed to retrieve assignments.', error });
  }
};


const submitAssignment = async (req, res) => {
  const studentId = req.user.id; 
  const { assignmentId, submission } = req.body;

  try {
    const assignmentSubmission = await prisma.submission.create({
      data: {
        assignment: { connect: { id: assignmentId } },
        student: { connect: { id: studentId } },
        submission,
      },
    });

    res.status(200).json({ message: 'Assignment submitted successfully!', submission: assignmentSubmission });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Failed to submit assignment.', error });
  }
};


const gradeAssignment = async (req, res) => {
  const teacherId = req.user.id; // Assuming you have authentication middleware to get the authenticated teacher's ID
  const { assignmentId, studentId, grade } = req.body;

  try {
    const gradedAssignment = await prisma.grade.create({
      data: {
        grade,
        assignment: { connect: { id: assignmentId } },
        student: { connect: { id: studentId } },
        teacher: { connect: { id: teacherId } },
      },
    });

    res.status(200).json({ message: 'Assignment graded successfully!', grade: gradedAssignment });
  } catch (error) {
    console.error('Error grading assignment:', error);
    res.status(500).json({ message: 'Failed to grade assignment.', error });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsForTeacher,
  getAssignmentsForStudent,
  submitAssignment,
  gradeAssignment,
};

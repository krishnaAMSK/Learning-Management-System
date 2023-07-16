const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const verifyJWT = require('../middleware/jwtTokenMiddleware');


router.post('/', verifyJWT, assignmentController.createAssignment);
router.get('/teacher', verifyJWT, assignmentController.getAssignmentsForTeacher);
router.post('/grade', verifyJWT, assignmentController.gradeAssignment);


router.get('/student', verifyJWT, assignmentController.getAssignmentsForStudent);
router.post('/submit', verifyJWT, assignmentController.submitAssignment);

module.exports = router;

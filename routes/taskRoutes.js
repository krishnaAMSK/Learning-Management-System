const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get tasks by date
router.get('/:date', taskController.getTasksByDate);

// Add a task
router.post('/', taskController.addTask);

module.exports = router;
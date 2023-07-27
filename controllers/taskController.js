const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTasksByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        date: new Date(date),
      },
      include: {
        user: true,
      },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

const addTask = async (req, res) => {
  const { title, description, date, userId } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date: new Date(date),
        user: {
          connect: { id: userId },
        },
      },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error adding task' });
  }
};

module.exports = {
  getTasksByDate,
  addTask,
};
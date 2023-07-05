const prisma = require('../prisma/db');
// Controller function to get files for a specific user ID
const getFilesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch files for the given user ID from Prisma
    const files = await prisma.file.findMany({
      where: {
        userId,
      },
    });

    if (files.length === 0) {
      return res.status(400).json({ message: 'No files found for the provided user ID' });
    }

    return res.status(200).json({ files });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(401).json({ message: 'Invalid user ID' });
    }

    return res.status(400).json({ message: 'Error fetching files', error });
  }
};

module.exports = { getFilesByUserId };

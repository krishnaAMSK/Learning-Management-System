const prisma = require('../prisma/db');

const getProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    return res.json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = { getProfile };
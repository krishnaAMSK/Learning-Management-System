const prisma = require('../prisma/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token.' });
        }

        const { userId } = decoded;

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }

        const newAccessToken = generateAccessToken(user.id); // Replace with your own access token generation logic

        return res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.error('Error occurred during token refresh: ', error);
    return res.status(500).json({ message: 'Token refresh failed.' });
  }
};

const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  return accessToken;
};

module.exports = refreshToken;

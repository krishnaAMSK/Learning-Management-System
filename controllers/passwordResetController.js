const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handlePasswordReset = async (req, res) => {
  const { username, newPassword, resetToken } = req.body;
  if (!username || !newPassword || !resetToken)
    return res.status(400).json({ message: 'Username, new password, and reset token are required.' });

  try {
    // Verify the reset token using JWT
    jwt.verify(
      resetToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid reset token.' });
        }

        const { userId } = decoded;

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
            username: username
          }
        });

        if (!user)
          return res.status(404).json({ message: 'User not found.' });

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            password: hashedPassword
          }
        });

        res.status(200).json({ success: 'Password reset successfully.' });
      }
    );
  } catch (error) {
    console.error('Error occurred during password reset: ', error);
    res.status(500).json({ message: error });
  }
};

module.exports = { handlePasswordReset };

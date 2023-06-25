const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');

const handlePasswordReset = async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword)
    return res.status(400).json({ 'message': 'Username and new password are required.' });

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (!user)
      return res.status(404).json({ 'message': 'User not found.' });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword
      }
    });

    res.status(200).json({ 'success': 'Password reset successfully.' });
  } catch (error) {
    console.error('Error occurred during password reset: ', error);
    res.status(500).json({ 'message': error });
  }
};

module.exports = { handlePasswordReset };

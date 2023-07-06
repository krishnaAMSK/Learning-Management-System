const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');
const {constants} = require('../constants');

const handlePasswordReset = async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword)
    return res.status(constants.VALIDATION_ERROR).json({ 'message': 'Username and new password are required.' });

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (!user)
      return res.status(constants.NOT_FOUND).json({ 'message': 'User not found.' });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword
      }
    });

    res.status(constants.SUCCESS).json({ 'success': 'Password reset successfully.' });
  } catch (error) {
    console.error('Error occurred during password reset: ', error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ 'message': error });
  }
};

module.exports = { handlePasswordReset };

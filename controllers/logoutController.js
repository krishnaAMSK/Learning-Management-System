const {constants} = require('../constants');

const handleLogoutUser = async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.auth)
        return res.sendStatus(constants.NO_CONTENT);
    
    res.clearCookie('auth', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(constants.CREATED_SUCCESSFULLY).json({ 'message': 'User Logged out' });
}

module.exports = { handleLogoutUser };
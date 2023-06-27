const handleLogoutUser = async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.auth)
        return res.sendStatus(204);
    
    res.clearCookie('auth', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(201).json({ 'message': 'User Logged out' });
}

module.exports = { handleLogoutUser };
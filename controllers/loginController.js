const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {constants} = require('../constants');

const handleLoginUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password)
            return res.status(constants.VALIDATION_ERROR).json({"message": "Username and password is required"});
            
        async function getUserByUsername(username){
            try{
                const userLogin = await prisma.user.findUnique({
                    where: {
                        username: username,
                    },
                });

                if(!userLogin)
                    return res.status(constants.UNAUTHORIZED).json({"message": "User not found."});

                const checkPassword = await bcrypt.compare(password, userLogin.password);
                if(checkPassword) {
                    const accessToken = jwt.sign(
                        {"username": userLogin.username},
                        process.env.JWT_SECRET,
                        { expiresIn: '1d' }
                    );
                    console.log("User successfully logged in:", userLogin);
                    const cookieOptions = {
                        httpOnly: true,
                        maxAge:  24 * 60 * 60 * 1000,
                        secure: true,
                        signed: true
                    }
                    console.log(accessToken);
                    res.cookie('auth', accessToken, cookieOptions);
                    if(userLogin.is_Verified)
                        res.json({"message": "Logged in and cookie set successfully."});
                    else
                        res.json({"message": "Logged in and cookie set successfully. But please verify your email."})
                }
                else{
                    return res.status(constants.UNAUTHORIZED).json({"message": "Invalid Credentials."});
                }
                
            }catch(error){
                console.error('Error occured during user creation: ', error);
                res.status(constants.INTERNAL_SERVER_ERROR).json({ "message": error });
            }
        }

        getUserByUsername(username);
    }
    catch(error){
        console.error("Error during login: ", error);
    }
}

module.exports = { handleLoginUser };
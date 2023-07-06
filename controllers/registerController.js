const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');
const randomstring=require('randomstring');
const {constants} = require('../constants');
const {emailContent}=require('./emailVerification');

const handleNewUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) 
        return res.status(constants.VALIDATION_ERROR).json({ 'message': 'Username, Password and E-Mail are required.' });

    const duplicateUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    
    if(duplicateUser) 
        return res.status(constants.VALIDATION_ERROR).json({ 'message': 'Username already exits' });

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const randomToken=randomstring.generate();

        async function createUser(username, password, email, randomToken){
            try{
                const token = randomToken;
                const is_Verified = false;
                const newUser = await prisma.user.create({
                    data:{
                        username,
                        password,
                        email,
                        token,
                        is_Verified
                    }
                });
                console.log("New user created:", newUser);
                return new Promise ((resolve, reject) =>{
                    res.status(constants.CREATED_SUCCESSFULLY).json({ 'success': `New user ${newUser.username} created!` });
                    resolve();
                })
            }catch(error){
                console.error('Error occured during user creation: ', error);
                res.status(constants.INTERNAL_SERVER_ERROR).json({ 'message': error });
            }
        }
        createUser(username, hashedPassword, email, randomToken).then(emailContent(username,email, randomToken));
        
        
    } catch (err) {
        res.status(constants.INTERNAL_SERVER_ERROR).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
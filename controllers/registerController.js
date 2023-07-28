const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');
const randomstring=require('randomstring');
const {emailContent}=require('./emailVerification');

const handleNewUser = async (req, res) => {
    const { username, password, email,userRole } = req.body;
    if (!username || !password || !email || !userRole) 
        return res.status(400).json({ 'message': 'Username, Password and E-Mail are required.' });

    const duplicateUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    
    if(duplicateUser) 
        return res.status(409).json({ 'message': 'Username already exits' });

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const randomToken=randomstring.generate();

        async function createUser(username, password, email, randomToken, userRole){
            try{
                const token = randomToken;
                const is_Verified = false;
                const newUser = await prisma.user.create({
                    data:{
                        username,
                        password,
                        email,
                        token,
                        is_Verified,
                        userRole
                    }
                });
                console.log("New user created:", newUser);
                return new Promise ((resolve, reject) =>{
                    res.status(201).json({ 'success': `New user ${newUser.username} created!` });
                    resolve();
                })
            }catch(error){
                console.error('Error occured during user creation: ', error);
                res.status(500).json({ 'message': error });
            }
        }
        createUser(username, hashedPassword, email, randomToken,userRole).then(emailContent(username,email, randomToken));
        
        
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
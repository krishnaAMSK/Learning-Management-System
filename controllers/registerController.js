const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) 
        return res.status(400).json({ 'message': 'Username, Password and E-Mail are required.' });

    const duplicateUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    
    if(duplicateUser) 
        return res.status(400).json({ 'message': 'Username already exits' });

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        async function createUser(username, password, email){
            try{
                const newUser = await prisma.user.create({
                    data:{
                        username,
                        password,
                        email
                    }
                });
                console.log("New user created:", newUser);
                res.status(201).json({ 'success': `New user ${newUser.username} created!` });
            }catch(error){
                console.error('Error occured during user creation: ', error);
                res.status(500).json({ 'message': error });
            }
        }
        createUser(username, hashedPassword, email)
        
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
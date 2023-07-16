const prisma = require('../prisma/db');

const listFiles = async (req, res) => {
    try {
        const username = req.user;
        if(!username)
            return res.status(400).json({"message": "Username not found."});
        
        const userDetails = await prisma.user.findUnique({
            where:{
                username: username,
            },
        });

        if(!userDetails)
            return res.status(401).json({"message": "User not found."});
        
        async function getListOfFile(userId){
            try {
                const userFileList = await prisma.file.findMany({
                    where:{
                        userId: userId,
                    }
                });
                if(!userFileList)
                    return res.json({"message": "No list of file has been found"});
                
                return res.status(200).json(userFileList);
            } catch (error) {
                console.log(error);
                return res.json({"message": "Error occured while searching for files."});
            }
        }
        const userID = userDetails.id;
        getListOfFile(userID);

    } catch (error) {
        console.log(error);
        return res.json({"message": "Error occured while searching for files."});
    }
};

module.exports = { listFiles }
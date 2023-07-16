const path = require('path');
const prisma = require('../prisma/db');


const customFileName = (req, file, cb) => {
    const timestamp = Date.now();
    const filename = `${req.user}-${file.originalname}`;
    cb(null, filename);
}

const fileUpload = async(req, res) => {
    const username = req.user;
    if(!username)
        return res.status(400).json({"message": "Username not found."})

    const userDetails = await prisma.user.findUnique({
        where:{
            username: username,
        },
    })
        
    if(!userDetails)
        return res.status(401).json({"message": "User not found."});

    const file = req.file;
    if(!file)
        return res.status(404).json({"message": "File not found"});
    
    try {
        async function uploadFileDetails(storedName, userId){
            try {
                const fileDetails = await prisma.file.create({
                    data:{
                        userId: userId,
                        fileName: storedName
                    }
                });
                console.log("File Uploaded: ", storedName);
                return res.status(200).json({"message": "Successfully uploaded."});
            } catch (error) {
                console.log(error);
                return res.status(500);
            }
        }
        const storedName = file.filename;
        const userId = userDetails.id;
        uploadFileDetails(storedName, userId);

    } catch (error) {
        res.status(500).json({"message": error})
    }
}

const showUploadPage = async(req, res) => {
    return res.sendFile(path.join(__dirname + "/../views/upload.html"));
}

module.exports = { fileUpload, showUploadPage, customFileName };
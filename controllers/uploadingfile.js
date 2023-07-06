const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const fileUpload = async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    
    const uploadedFile = await prisma.file.create({
      data: {
        userId: userId,
        filename: file.filename,
        originalFilename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

const showUploadPage = (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'views', 'upload.html'));
};

module.exports = { fileUpload, showUploadPage };

const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    uploadController.customFileName(req, file, cb);
  },
});

const allowedTypes = [
  { extension: ['.jpg', '.jpeg', '.png', '.gif'], maxSize: 10 * 1024 * 1024, mimeType: "image/" }, // Images (10 MB)
  { extension: ['.mp4'], maxSize: 500 * 1024 * 1024, mimeType: "video/mp4" }, // Videos (500 MB)
  { extension: ['.pdf'], maxSize: 100 * 1024 * 1024, mimeType: "application/pdf" }, // PDFs (100 MB)
];

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const fileType = allowedTypes.find((type) => type.extension.includes(fileExtension));
  if (fileType) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const sizeFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image/')){
    const imageMaxsize = 10 * 1024 * 1024;
    cb(null, imageMaxsize);
  }else if(file.mimetype === 'video/mp4'){
    const videoMaxsize = 500 * 1024 * 1024;
    cb(null, videoMaxsize);
  }else if(file.mimetype === 'application/pdf'){
    const pdfMaxsize = 100 * 1024 * 1024;
    cb(null, pdfMaxsize);
  }else{
    cb(new Error('File size exceeded'));
  }
}

const upload = multer({ storage, fileFilter, sizeFilter });

module.exports = upload;
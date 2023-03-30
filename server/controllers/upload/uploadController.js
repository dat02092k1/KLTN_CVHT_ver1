const { cloudinary } = require("../../uploads/cloudinary.js");

var uploadImageController = async (req, res) => { 
    const file = req.file;

    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).send({ message: 'Only image files are allowed' });
    }
    
    cloudinary.uploader.upload(file.path, 
      {
        folder: 'File_img_CVHT_UET'
      }, (error, result) => {
      if (error) {
        console.log('Error uploading image', error);
        res.status(500).send({ message: 'Error uploading image' });
      } else {
        console.log('Image uploaded successfully', result);
        res.send({ url: result.secure_url });
      }
    }); 
}
 
var uploadDocsController = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.mimetype !== 'application/zip') {
    return res.status(400).send({ message: 'Invalid file type' });
  }

  const fileExtension = require('mime-types').extension(file.mimetype);

  cloudinary.uploader.upload(file.path, {
    folder: 'File_docs_CVHT_UET',
    resource_type: 'raw',
    format: fileExtension
  }, (error, result) => {
    if (error) {
      console.log('Error uploading document', error);
      res.status(500).send({ message: 'cant upload' });
    } else {
      console.log('Document uploaded successfully', result);
      res.send({ url: result.secure_url });
    }
  });
}

module.exports = { uploadImageController, uploadDocsController } ;         


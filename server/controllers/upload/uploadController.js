const { cloudinary } = require("../../uploads/cloudinary.js");

var uploadImageController = async (req, res) => { 
    const file = req.file;
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        console.log('Error uploading image', error);
        res.status(500).send({ message: 'Error uploading image' });
      } else {
        console.log('Image uploaded successfully', result);
        res.send({ url: result.secure_url });
      }
    }); 
}

module.exports = { uploadImageController } ;         


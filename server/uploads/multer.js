const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage, limits: {
  fileSize: 5 * 1024 * 1024, // 5MB in bytes
} });

module.exports = { upload }; 
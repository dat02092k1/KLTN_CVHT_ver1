const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students'
  },
  CPA: { 
    type: Number,
    default: 0
  },
  status: {
    type: String,
        enum: [
            "Không",
            "Cảnh báo học vụ",
            "Khen thưởng"
          ],
        default: "Không"
  }
});

module.exports = mongoose.model('scores', scoreSchema);

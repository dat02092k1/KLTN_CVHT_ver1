const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
    username: {
      type: String,
    },
    _class: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Phiếu đánh giá kết quả rèn luyện",
        "Kế hoạch học tập",
        "Biên bản họp lớp",
      ],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("forms", formSchema);

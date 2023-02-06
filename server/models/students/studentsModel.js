const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Nam', 'Nữ'],
        required: true
    },
    total_creadits: {
        type: Number,
    },
    status: {
        type: String,
        enum: [
            "Không",
            "Cảnh báo học vụ",
            "Thiếu tín chỉ",
            "Thiếu học phí",
            "Khen thưởng"
          ],
        default: "Không"
    },
    _class: {
        type: String,
        required: true,
    },
    gpa: {
        type: Number
    },
    paidFee: {
        type: Boolean
    }
})

module.exports = mongoose.model('students', studentSchema);            
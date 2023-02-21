const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "manager"],
        default: "student",
        required: true,
    },
    // diem: { type: array, required: true}
    birthdate: {
        type: Date,
    },
    address: {
        type: String,
    },
    emailAddress: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Nam', 'Nữ'],
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
    },
    gpa: {
        type: Number
    },
    paidFee: {
        type: Boolean
    }
})

module.exports = mongoose.model('students', studentSchema);            
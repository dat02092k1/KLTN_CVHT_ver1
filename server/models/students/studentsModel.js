const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        index: true
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
        enum: ["student", "manager", "consultant"],
        default: "student",
        required: true,
    },
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
    },
    total_creadits: {
        type: Number,
        default: 0 
    },
    _class: [
        {
            name: { 
                type: String
            }
        }
    ],
    paidFee: {
        type: Boolean
    }
})

studentSchema.index({ studentId: 1 })

module.exports = mongoose.model('students', studentSchema);              
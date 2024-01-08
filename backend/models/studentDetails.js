const mongoose = require('mongoose');
const user = require("../models/userReg.js")

const studentSchema = new mongoose.Schema({
    suser: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    sid: {
        type: String,
        unique: true,
        required: [true, "can't be blank"]
    },
    scourses: {
        type: [
            {
                cid: { 
                    type: schema.Types.ObjectId,
                    ref:"Courses"
                }
            }
        ]
    }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
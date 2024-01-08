const mongoose = require('mongoose');
const user = require("../models/userReg.js")

const studentSchema = new mongoose.Schema({
    suser: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }
})

const Student = mongoose.model('Student', studentSchema);

const teacherSchema = new mongoose.Schema({
    tuser: {
        type: schema.Types.ObjectId,
        ref: 'User'
        }
})

const Teacher = mongoose.model('Teacher', teacherSchema);

const adminSchema = new mongoose.Schema({
    auser: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {Student, Teacher, Admin}